const express = require('express');
const router = express.Router();
const Url = require('../models/url');

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

router.post('/shorten', async (req, res) => {
  const fullUrl = req.body.fullUrl;
  const url = new Url({ full: fullUrl });
  await url.save();
  res.json({ shortUrl: `${req.headers.host}/${url.short}` });
});

router.get('/:shortUrl', async (req, res) => {
  const shortUrl = req.params.shortUrl;
  const url = await Url.findOne({ short: shortUrl });
  if (url) {
    res.redirect(url.full);
  } else {
    res.status(404).send('URL not found');
  }
});

module.exports = router;
