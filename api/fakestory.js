const fetch = require("node-fetch");

module.exports = {
  name: "Fake Story",
  desc: "Generator fake Instagram story",
  category: "Imagecreator",
  path: "/imagecreator/fakestory?apikey=&username=&caption=&ppurl=",
  async run(req, res) {
    const { apikey, username, caption, ppurl } = req.query;

    if (!apikey || !global.apikey.includes(apikey)) {
      return res.json({ status: false, error: "Apikey invalid" });
    }
    if (!username || !caption || !ppurl) {
      return res.json({ status: false, error: "Field username, caption, ppurl wajib diisi" });
    }

    try {
      const apiUrl = `https://api.zenzxz.my.id/api/maker/fakestory?username=${encodeURIComponent(username)}&caption=${encodeURIComponent(caption)}&ppurl=${encodeURIComponent(ppurl)}`;
      const response = await fetch(apiUrl);
      const buffer = await response.buffer();
      res.writeHead(200, { "Content-Type": "image/png", "Content-Length": buffer.length });
      res.end(buffer);
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
};