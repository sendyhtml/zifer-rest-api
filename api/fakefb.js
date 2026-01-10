const fetch = require("node-fetch");

module.exports = {
  name: "Fake FB",
  desc: "Generator fake Facebook comment",
  category: "Imagecreator",
  path: "/imagecreator/fakefb?apikey=&name=&comment=&ppurl=",
  async run(req, res) {
    const { apikey, name, comment, ppurl } = req.query;

    if (!apikey || !global.apikey.includes(apikey)) {
      return res.json({ status: false, error: "Apikey invalid" });
    }
    if (!name || !comment || !ppurl) {
      return res.json({ status: false, error: "Field name, comment, ppurl wajib diisi" });
    }

    try {
      const apiUrl = `https://api.zenzxz.my.id/api/maker/fakefb?name=${encodeURIComponent(name)}&comment=${encodeURIComponent(comment)}&ppurl=${encodeURIComponent(ppurl)}`;
      const response = await fetch(apiUrl);
      const buffer = await response.buffer();
      res.writeHead(200, { "Content-Type": "image/png", "Content-Length": buffer.length });
      res.end(buffer);
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
};