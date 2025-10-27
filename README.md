# Shin API UI

> Interactive REST API documentation + sandbox UI for file-based API endpoints.
> **Live demo:** [https://shin-apis.onrender.com/](https://shin-apis.onrender.com/)
>
> **Note:** Shin API UI is the successor of **Wataru API** ([https://github.com/ajirodesu/wataru-api](https://github.com/ajirodesu/wataru-api)). It preserves compatibility with Wataru-style endpoint files and supports both the Shin `meta` format and Wataru's `meta.path` conventions.

---

# Table of contents

* About
* Key changes from Wataru API
* Features
* Quick start
* `settings.js` — configuration (example + field reference)
* Endpoint file format / template (Wataru-compatible)
* Example: `hello.js` (Wataru-style path example)
* Example: `lyrics.js`)
* How to call / test an endpoint (live example)
* Response format conventions & best practices
* Deploying
* Contributing & credits
* License

---

# About

Shin API UI is a lightweight UI and tiny Node server for documenting and exposing REST endpoints created as individual `.js` files under an `api/` folder. Each endpoint exports a `meta` object (used by the UI) and an `onStart` function that handles the incoming request.

This project is the successor to Wataru API ([https://github.com/ajirodesu/wataru-api](https://github.com/ajirodesu/wataru-api)). It was designed to be backwards-compatible, so endpoints written for Wataru API will work with Shin API UI with little or no change.

# Key changes from Wataru API

* Modernized UI and branding (Shin).
* Maintains support for Wataru-style `meta.path` when present — the server will attempt to honor `meta.path` as the exposed route.
* Cleaner response conventions: by default Shin responses.
* Extended `meta` support (author, version, category, and optional `path` field to match Wataru-style files).

---

# Features

* Drop-in API files (each file is a self-contained endpoint).
* `meta` object used by the UI to describe each endpoint.
* Support for Wataru-compatible `meta.path` routing when provided.
* Standard JSON response patterns (200, 400, 404, 500) by convention.
* Customizable `settings.js` for branding, links, and notifications.
* Ready to deploy on Vercel / Render / any Node host.
* Live demo: [https://shin-apis.onrender.com/](https://shin-apis.onrender.com/)

---

# Quick start

1. Clone the repo:

```bash
git clone https://github.com/ajirodesu/Shin-API-UI.git
cd Shin-API-UI
```

2. Install dependencies:

```bash
npm install
```

3. Edit `settings.js` to configure the UI (see the settings section below).

4. Add your API files into the `api/` folder (see templates below).

5. Start the server locally:

```bash
npm start
# or
node index.js
```

Open the UI in your browser (default: `http://localhost:<PORT>`).

---

# `settings.js` — configuration

Example `settings.js`:

```js
module.exports = {
  name: 'Shin APIs',
  description: 'This interactive interface allows you to explore and test our comprehensive collection of API endpoints in real-time.',
  icon: '/docs/image/icon.png',
  author: 'ShinDesu',
  telegram: 'https://t.me/+AQO22J2q6KBlNWM1',
  notification: [
    { title: 'New API Added', message: 'Blue Achieve and Loli API have been added to the documentation.' },
    { title: 'System Update', message: 'The API documentation system has been updated to version 0.0.2' }
  ]
};
```

**Field reference**

* `name` — Display name for the UI.
* `description` — Short description shown in header/home.
* `icon` — Path or URL to an icon used in the UI.
* `author` — Project owner / maintainer.
* `telegram` — Contact / support link (optional).
* `notification` — Array of `{ title, message }` shown in UI (optional).

---

# Endpoint file format / template (Wataru-compatible)

Shin expects each endpoint file in the `api/` folder to export at least two things:

* `meta` — metadata used by the UI and by the server to expose the endpoint.
* `onStart` — an async function that receives the Node/Express `req` and `res` objects and handles the request.

Shin is compatible with the Wataru-style `meta.path`. If `meta.path` is present, Shin will try to expose the endpoint at that path. If absent, Shin will derive the path from `meta.category` and `meta.name` (for example: `/search/lyrics`).

**Recommended `meta` fields**

* `name` — short identifier for this endpoint (string).
* `version` — semantic version of the endpoint (string).
* `desc` or `description` — short description shown in the UI.
* `author` — endpoint author (string).
* `method` — HTTP method this endpoint expects (`get`, `post`, etc.).
* `category` — grouping for the UI (string).
* `path` — *optional* explicit route (Wataru-compatible). Example: `/hello?name=`.
* `guide` — object describing parameters (`{ paramName: 'description' }`).
* `params` — array of param names for the UI.

**Minimal template (recommended)**

```js
// api/template.js
const meta = {
  name: '',
  version: '1.0.0',
  desc: '',
  author: '',
  method: 'get',
  category: 'general',
  // Optional: if you want a custom route like Wataru API, set path
  // path: '/myroute?param=' // Wataru-compatible
  guide: {},
  params: []
};

async function onStart({ req, res }) {
  // TODO: implement your endpoint logic
  return res.status(501).json({ error: 'Not implemented' });
}

module.exports = { meta, onStart };
```

---

# Example: `hello.js` (Wataru-style path)

This example demonstrates using `meta.path` (Wataru compatibility). The server will try to expose the endpoint at the path declared in `meta.path`. The `onStart` respects query parameters provided in the `path` example.

```js
// api/hello.js
const meta = {
  name: 'hello',
  version: '1.0.0',
  description: 'A simple example API that returns a greeting message',
  author: 'Your Name',
  method: 'get',
  category: 'examples',
  // Optional Wataru-style path — Shin will honor if present
  path: '/hello?name='
};

async function onStart({ req, res }) {
  // Extract the 'name' parameter from the query string
  const { name } = req.query;

  // Default to 'World' if no name is provided
  const greeting = name ? `Hello, ${name}!` : 'Hello, World!';

  // Return a simple JSON response
  return res.json({ message: greeting });
}

module.exports = { meta, onStart };
```

---

# Example: `lyrics.js`)

```js
// api/lyrics.js
const meta = {
  name: 'lyrics',
  desc: 'retrieves lyrics for a specified song and artist',
  method: 'get',
  category: 'search',
  guide: { artist: 'The artist of the song', song: 'The title of the song' },
  params: ['artist', 'song']
};

async function onStart({ req, res }) {
  const { artist, song } = req.query;

  if (!artist || !song) {
    return res.status(400).json({ error: 'Missing required parameters: artist and song' });
  }

  try {
    const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.lyrics) {
      return res.json({ lyrics: data.lyrics });
    } else {
      return res.status(404).json({ error: 'Lyrics not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { meta, onStart };
```

---

# How to call / test an endpoint

**Local pattern**

```
GET http://localhost:<PORT>/<category>/<endpoint>?param1=value1&param2=value2
```

**If an endpoint uses `meta.path` (Wataru-style), the server will attempt to expose it at that path.**

**Live example (public)**

```
GET https://shin-apis.onrender.com/search/lyrics?artist=Adele&song=Hello
```

**curl example (live):**

```bash
curl "https://shin-apis.onrender.com/api/lyrics?artist=Adele&song=Hello"
```

**Example responses:**

* **Success (200)**

```json
{ "lyrics": "Hello, it's me..." }
```

* **Bad request (400)**

```json
{ "error": "Missing required parameters: artist and song" }
```

* **Not found (404)**

```json
{ "error": "Lyrics not found" }
```

* **Server error (500)**

```json
{ "error": "Internal server error" }
```

---

# Response format conventions & best practices

* Use proper HTTP status codes (200, 400, 404, 500).
* Keep JSON payloads concise and consistent — avoid including timestamps or internal attribution unless explicitly desired.
* Clearly document required/optional params in `meta.guide`.
* If an endpoint queries slow external services, consider caching and/or rate-limiting.
* If you rely on `meta.path`, make sure query placeholders (e.g. `?name=`) match the parameters documented in `meta.guide`.

---

# Deploying

* The repo is compatible with Vercel, Render, and other Node hosts.
* For the public demo, see: [https://shin-apis.onrender.com/](https://shin-apis.onrender.com/)
* On hosts like Render or Vercel, connect the GitHub repo and follow their deployment flow. Ensure `index.js` and `package.json` `start` script are correct.

---

# Contributing & credits

This project is based on Rynn’s REST API UI design — special thanks to [https://github.com/rynn-k](https://github.com/rynn-k) for the original project. The repository `Shin-API-UI` is an adaptation and extension by `ajirodesu`.

Contributing guidelines:

1. Fork the repo.
2. Add your API file(s) to `/api`.
3. Open a pull request with a short description of the endpoint(s) you added.

---

# License

This project is MIT licensed (see the `LICENSE` file in the repo).

---