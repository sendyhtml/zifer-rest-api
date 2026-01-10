const fetch = require("node-fetch");

module.exports = {
  name: "YouTube Thumbnail",
  desc: "Downloader thumbnail YouTube dengan berbagai kualitas",
  category: "Imagecreator",
  path: "/imagecreator/youtubethumbnail?apikey=&url=",
  async run(req, res) {
    const { apikey, url } = req.query;

    if (!apikey || !global.apikey.includes(apikey)) {
      return res.json({ status: false, error: "Apikey invalid" });
    }
    if (!url) {
      return res.json({ status: false, error: "URL YouTube wajib diisi" });
    }

    try {
      const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      if (!videoId || !videoId[1]) {
        return res.json({ status: false, error: "URL YouTube tidak valid" });
      }

      const qualities = ["maxresdefault", "sddefault", "hqdefault", "mqdefault", "default"];
      const thumbs = qualities.map(q => `https://img.youtube.com/vi/${videoId[1]}/${q}.jpg`);

      return res.json({ status: true, thumbnails: thumbs });
    } catch (error) {
      return res.json({ status: false, error: error.message });
    }
  }
};