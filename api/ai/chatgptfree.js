const axios = require('axios');

const meta = {
  name: 'ChatGPT Free',
  desc: 'send a prompt to a selectable ChatGPT models',
  method: 'get',
  category: 'AI',
  guide: {
    prompt: 'The text prompt to send to the model',
    model: "Optional model key: 'chatgpt4' (default) or 'chatgpt3'"
  },
  params: ['prompt', 'model']
};

async function onStart({ req, res }) {
  const { prompt, model = 'chatgpt4' } = req.query;

  const model_list = {
    chatgpt4: {
      api: 'https://stablediffusion.fr/gpt4/predict2',
      referer: 'https://stablediffusion.fr/chatgpt4'
    },
    chatgpt3: {
      api: 'https://stablediffusion.fr/gpt3/predict',
      referer: 'https://stablediffusion.fr/chatgpt3'
    }
  };

  if (!prompt) {
    return res.status(400).json({ error: 'Missing required parameter: prompt' });
  }

  if (!model_list[model]) {
    return res.status(400).json({
      error: `Invalid model. Available models: ${Object.keys(model_list).join(', ')}`
    });
  }

  try {
    // Load referer to receive cookies if any
    const refererResp = await axios.get(model_list[model].referer);
    const setCookie = refererResp.headers && refererResp.headers['set-cookie'];
    const cookieHeader = Array.isArray(setCookie) ? setCookie.join('; ') : undefined;

    const { data } = await axios.post(
      model_list[model].api,
      { prompt },
      {
        headers: {
          accept: '*/*',
          'content-type': 'application/json',
          origin: 'https://stablediffusion.fr',
          referer: model_list[model].referer,
          ...(cookieHeader ? { cookie: cookieHeader } : {}),
          'user-agent':
            'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36'
        }
      }
    );

    return res.json({ message: data.message });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

module.exports = { meta, onStart };
