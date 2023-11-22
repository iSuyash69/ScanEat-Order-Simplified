// routes/menuRoutes.js
const express = require('express');
const menuController = require('../controllers/menuController');

const router = express.Router();

router.get('/home/:id', menuController.getItems);
router.get('/home/:id/:category', menuController.getCategoryItems);
router.get('/veg', menuController.getVegItems);
router.get('/home/:id/abc/cart', menuController.getCartItems);
router.post('/home/:id', menuController.searchItems);
router.post('/home/:id/abc/placeOrder', menuController.placeOrder);

module.exports = router;
