const express = require("express");
const router = express.Router();
const Url = require("../models/url");

// Create short URL
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = Math.random().toString(36).substring(7);
  const newUrl = new Url({ originalUrl, shortUrl });
  await newUrl.save();
  res.json({ shortUrl });
});

// Redirect to original URL
router.get("/:shortUrl", async (req, res) => {
  const url = await Url.findOne({ shortUrl: req.params.shortUrl });
  if (url) {
    url.clicks++;
    await url.save();
    return res.redirect(url.originalUrl);
  }
  res.status(404).send("URL not found");
});

module.exports = router;