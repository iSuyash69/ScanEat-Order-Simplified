// routes/chefRoutes.js
const express = require('express');
const chefController = require('../controllers/chefController');

const router = express.Router();

router.put('/chef', chefController.updateOrderStatusToDelivered);

module.exports = router;
