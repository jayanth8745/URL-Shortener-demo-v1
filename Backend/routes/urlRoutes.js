const express = require("express");
const router = express.Router();
const Url = require("../models/url");

// CREATE
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "URL required" });
    }

    const shortUrl = Math.random().toString(36).substring(7);

    const newUrl = new Url({
      originalUrl,
      shortUrl
    });

    await newUrl.save();

    res.json({ shortUrl });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// REDIRECT
router.get("/:shortUrl", async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });

    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.originalUrl);
    }

    res.status(404).send("URL not found");

  } catch (err) {
    res.status(500).send("Error");
  }
});

module.exports = router;