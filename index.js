const express = require("express");
const axios = require("axios");
const app = express();

app.get("/api/download", async (req, res) => {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({
      success: false,
      message: "videoId query parameter is required",
    });
  }

  const ytUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const downloaderApi = `https://kaiz-apis.gleeze.com/api/yt-down?url=${encodeURIComponent(ytUrl)}&apikey=67609e3c-abd9-4261-9b7b-fde637c0ba9d`;

  try {
    const response = await axios.get(downloaderApi);

    res.json({
      success: true,
      videoUrl: ytUrl,
      downloadResult: response.data
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Downloader API error",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
    
