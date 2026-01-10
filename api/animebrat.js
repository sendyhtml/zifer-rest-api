const fetch = require("node-fetch");

module.exports = {
  name: "Anime Brat",
  desc: "Generator anime brat image",
  category: "Imagecreator",
  path: "/imagecreator/animebrat?apikey=&text=",
  async run(req, res) {
    const { apikey, text } = req.query;

    if (!apikey || !global.apikey.includes(apikey)) {
      return res.json({ status: false, error: "Apikey invalid" });
    }
    if (!text) {
      return res.json({ status: false, error: "Text wajib diisi" });
    }

    try {
      const apiUrl = `https://api.zenzxz.my.id/api/maker/animegirl/image?text=${encodeURIComponent(text)}`;
      const response = await fetch(apiUrl);
      const buffer = await response.buffer();
      res.writeHead(200, { "Content-Type": "image/png", "Content-Length": buffer.length });
      res.end(buffer);
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
};