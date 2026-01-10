const fetch = require("node-fetch");

module.exports = {
  name: "Get Code",
  desc: "Get Source Html",
  category: "Tools",
  path: "/tools/getcode?apikey=&url=",
  async run(req, res) {
    const { apikey, url } = req.query;

    if (!apikey || !global.apikey.includes(apikey)) {
      return res.json({ status: false, error: "Apikey invalid" });
    }
    if (!url) {
      return res.json({ status: false, error: "URL wajib diisi" });
    }

    try {
      const apiUrl = `https://api.fikmydomainsz.xyz/tools/getcode?url=${encodeURIComponent(url)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return res.json({ status: true, result: data });
    } catch (error) {
      return res.json({ status: false, error: error.message });
    }
  }
};