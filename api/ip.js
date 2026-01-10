const fetch = require("node-fetch");

module.exports = {
  name: "Track IP",
  desc: "Melacak informasi IP",
  category: "Tools",
  path: "/tools/trackip?apikey=&ip=",
  async run(req, res) {
    const { apikey, ip } = req.query;

    if (!apikey || !global.apikey.includes(apikey)) {
      return res.json({ status: false, error: "Apikey invalid" });
    }

    try {
      const apiKey = "d81e6d0ed0dd48e185643ffa047abc17";
      const apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip || "check"}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return res.json({ status: true, result: data });
    } catch (error) {
      return res.json({ status: false, error: error.message });
    }
  }
};