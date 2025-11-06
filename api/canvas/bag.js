// bag.js
const { createCanvas, loadImage: loadImageOrig } = require('@napi-rs/canvas');

function isValidURL(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

function intToString(num) {
    if (num < 1000) {
        return num;
    }
    var si = [
      {v: 1E3, s: "K"},
      {v: 1E6, s: "M"},
      {v: 1E9, s: "B"},
      {v: 1E12, s: "T"},
      {v: 1E15, s: "P"},
      {v: 1E18, s: "E"}
      ];
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].v) {
            break;
        }
    }
    return (num / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].s;
}

class Bag {
  constructor() {
    this.bg = "https://raw.githubusercontent.com/Zaxerion/databased/refs/heads/main/asset/IMG-20210623-154538-171.jpg";
    this.asset = "https://raw.githubusercontent.com/Zaxerion/databased/refs/heads/main/asset/Inventory.png";
    this.stone = 10;
    this.coal = 10;
    this.wood = 10;
    this.core = 10;
    this.iore = 10;
    this.gore = 10;
    this.cingot = 10;
    this.iingot = 10;
    this.gingot = 10;
    this.diamond = 10;
    this.ruby = 10;
    this.leather = 10;
    this.meat = 10;
    this.fish = 10;
  }

  setBackground(value) {
    this.bg = value;
    return this;
  }

  setAsset(value) {
    this.asset = value;
    return this;
  }

  setStone(value) {
    this.stone = Number(value);
    return this;
  }

  setCoal(value) {
    this.coal = Number(value);
    return this;
  }

  setWood(value) {
    this.wood = Number(value);
    return this;
  }

  setCore(value) {
    this.core = Number(value);
    return this;
  }

  setIore(value) {
    this.iore = Number(value);
    return this;
  }

  setGore(value) {
    this.gore = Number(value);
    return this;
  }

  setCingot(value) {
    this.cingot = Number(value);
    return this;
  }

  setIingot(value) {
    this.iingot = Number(value);
    return this;
  }

  setGingot(value) {
    this.gingot = Number(value);
    return this;
  }

  setDiamond(value) {
    this.diamond = Number(value);
    return this;
  }

  setRuby(value) {
    this.ruby = Number(value);
    return this;
  }

  setLeather(value) {
    this.leather = Number(value);
    return this;
  }

  setMeat(value) {
    this.meat = Number(value);
    return this;
  }

  setFish(value) {
    this.fish = Number(value);
    return this;
  }

  async toAttachment() {
    const canvas = createCanvas(500, 333);
    const ctx = canvas.getContext("2d");

    let background = await loadImageOrig(this.bg);
    ctx.drawImage(background, 0, 0, 500, 333);

    let assetImg = await loadImageOrig(this.asset);
    ctx.drawImage(assetImg, 0, 0, 500, 333);

    ctx.globalAlpha = 1;
    ctx.font = "bold 15px arial";
    ctx.textAlign = 'center';
    ctx.fillStyle = "black";
    ctx.fillText(intToString(this.stone), 52, 83);
    ctx.fillText(intToString(this.coal), 129, 83);
    ctx.fillText(intToString(this.wood), 202, 83);
    ctx.fillText(intToString(this.core), 278, 83);
    ctx.fillText(intToString(this.iore), 353, 83);

    ctx.globalAlpha = 1;
    ctx.font = "bold 15px arial";
    ctx.textAlign = 'center';
    ctx.fillStyle = "black";
    ctx.fillText(intToString(this.gore), 52, 158);
    ctx.fillText(intToString(this.cingot), 129, 158);
    ctx.fillText(intToString(this.iingot), 202, 158);
    ctx.fillText(intToString(this.gingot), 278, 158);
    ctx.fillText(intToString(this.diamond), 353, 158);

    ctx.globalAlpha = 1;
    ctx.font = "bold 15px arial";
    ctx.textAlign = 'center';
    ctx.fillStyle = "black";
    ctx.fillText(intToString(this.ruby), 52, 233);
    ctx.fillText(intToString(this.meat), 129, 233);
    ctx.fillText(intToString(this.fish), 202, 233);
    ctx.fillText(intToString(this.leather), 278, 233);

    return canvas.toBuffer('image/png');
  }
}

const meta = {
  name: 'bag',
  desc: 'Generate a bag inventory image',
  method: ['get', 'post'],
  category: 'canvas',
  params: [
    {
      name: 'bg',
      description: 'URL to the background image',
      example: 'https://raw.githubusercontent.com/lanceajiro/Storage/refs/heads/main/backiee-265579-landscape.jpg',
      required: true
    },
    {
      name: 'asset',
      description: 'URL to the asset inventory image',
      example: 'https://raw.githubusercontent.com/Zaxerion/databased/refs/heads/main/asset/Inventory.png',
      required: true
    },
    {
      name: 'stone',
      description: 'Quantity of stone',
      example: '100',
      required: false
    },
    {
      name: 'coal',
      description: 'Quantity of coal',
      example: '200',
      required: false
    },
    {
      name: 'wood',
      description: 'Quantity of wood',
      example: '300',
      required: false
    },
    {
      name: 'core',
      description: 'Quantity of copper ore',
      example: '400',
      required: false
    },
    {
      name: 'iore',
      description: 'Quantity of iron ore',
      example: '500',
      required: false
    },
    {
      name: 'gore',
      description: 'Quantity of gold ore',
      example: '600',
      required: false
    },
    {
      name: 'cingot',
      description: 'Quantity of copper ingot',
      example: '700',
      required: false
    },
    {
      name: 'iingot',
      description: 'Quantity of iron ingot',
      example: '800',
      required: false
    },
    {
      name: 'gingot',
      description: 'Quantity of gold ingot',
      example: '900',
      required: false
    },
    {
      name: 'diamond',
      description: 'Quantity of diamond',
      example: '1000',
      required: false
    },
    {
      name: 'ruby',
      description: 'Quantity of ruby',
      example: '1100',
      required: false
    },
    {
      name: 'leather',
      description: 'Quantity of leather',
      example: '1200',
      required: false
    },
    {
      name: 'meat',
      description: 'Quantity of meat',
      example: '1300',
      required: false
    },
    {
      name: 'fish',
      description: 'Quantity of fish',
      example: '1400',
      required: false
    }
  ]
};

async function onStart({ req, res }) {
  let bg, asset, stone, coal, wood, core, iore, gore, cingot, iingot, gingot, diamond, ruby, leather, meat, fish;
  if (req.method === 'POST') {
    ({ bg, asset, stone, coal, wood, core, iore, gore, cingot, iingot, gingot, diamond, ruby, leather, meat, fish } = req.body);
  } else {
    ({ bg, asset, stone, coal, wood, core, iore, gore, cingot, iingot, gingot, diamond, ruby, leather, meat, fish } = req.query);
  }

  if (!bg || !asset) {
    return res.status(400).json({ error: 'Missing required parameters: bg, asset' });
  }

  if (!isValidURL(bg)) {
    return res.status(400).json({ error: 'Invalid bg URL' });
  }

  if (!isValidURL(asset)) {
    return res.status(400).json({ error: 'Invalid asset URL' });
  }

  try {
    const bag = new Bag();
    bag.setBackground(bg);
    bag.setAsset(asset);
    if (stone !== undefined) bag.setStone(stone);
    if (coal !== undefined) bag.setCoal(coal);
    if (wood !== undefined) bag.setWood(wood);
    if (core !== undefined) bag.setCore(core);
    if (iore !== undefined) bag.setIore(iore);
    if (gore !== undefined) bag.setGore(gore);
    if (cingot !== undefined) bag.setCingot(cingot);
    if (iingot !== undefined) bag.setIingot(iingot);
    if (gingot !== undefined) bag.setGingot(gingot);
    if (diamond !== undefined) bag.setDiamond(diamond);
    if (ruby !== undefined) bag.setRuby(ruby);
    if (leather !== undefined) bag.setLeather(leather);
    if (meat !== undefined) bag.setMeat(meat);
    if (fish !== undefined) bag.setFish(fish);

    const buffer = await bag.toAttachment();
    res.type('image/png').send(buffer);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

module.exports = { meta, onStart };