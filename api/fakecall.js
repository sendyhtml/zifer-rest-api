const fetch = require("node-fetch");

module.exports = {
  name: "Fake Call",
  desc: "Generator fake call",
  category: "Imagecreator",
  path: "/imagecreator/fakecall?apikey=&nama=&durasi=&avatar=",
  async run(req, res) {
    const { apikey, nama, durasi, avatar } = req.query;

    if (!apikey || !global.apikey.includes(apikey)) {
      return res.json({ status: false, error: "Apikey invalid" });
    }
    if (!nama || !durasi || !avatar) {
      return res.json({ status: false, error: "Field nama, durasi, avatar wajib diisi" });
    }

    try {
      const apiUrl = `https://api.zenzxz.my.id/api/maker/fakecall?nama=${encodeURIComponent(nama)}&durasi=${encodeURIComponent(durasi)}&avatar=${encodeURIComponent(avatar)}`;
      const response = await fetch(apiUrl);
      const buffer = await response.buffer();
      res.writeHead(200, { "Content-Type": "image/png", "Content-Length": buffer.length });
      res.end(buffer);
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
};