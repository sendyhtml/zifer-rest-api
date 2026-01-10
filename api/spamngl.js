const fetch = require("node-fetch");

module.exports = {
  name: "Spam NGL",
  desc: "Tools Spam Ngl!",
  category: "Tools",
  path: "/tools/spamngl?apikey=&url=&message=&count=",
  async run(req, res) {
    const { apikey, url, message, count } = req.query;

    if (!apikey || !global.apikey.includes(apikey)) {
      return res.json({ status: false, error: "Apikey invalid" });
    }

    if (!url || !message || !count) {
      return res.json({ status: false, error: "Field url, message, count wajib diisi" });
    }

    try {
      const apiUrl = `https://api.fikmydomainsz.xyz/tools/spamngl?url=${encodeURIComponent(url)}&message=${encodeURIComponent(message)}&count=${encodeURIComponent(count)}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) throw new Error("Gagal mengirim spam");

      return res.json({ status: true, result: "Berhasil dikirim!" });
    } catch (error) {
      return res.json({ status: false, error: error.message });
    }
  }
};