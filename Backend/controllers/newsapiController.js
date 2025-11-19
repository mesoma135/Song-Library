const axios = require("axios");

//GET music news from external api
exports.getMusicNews = async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;

    const response = await axios.get(
      `https://newsapi.org/v2/everything`,
      {
        params: {
          q: "music",
          language: "en",
          sortBy: "publishedAt",
          pageSize: 10,
          apiKey: process.env.NEWS_API_KEY
        }
      }
    );
    res.json({
      status: "success",
      articles: response.data.articles
    });

  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: "Failed to fetch music news" });
  }
};