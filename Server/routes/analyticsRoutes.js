// analyticsRoutes.js
const express = require('express');
const router = express.Router();
const AnalyticsController = require('./analyticsController');

router.post("/manager/analytics", (req, res) => {
  const { data } = req.body;
  AnalyticsController.getAnalytics(data, res);
});

module.exports = router;
