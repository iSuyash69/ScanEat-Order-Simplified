// routes/managerRoutes.js
const express = require('express');
const managerController = require('../controllers/managerController');

const router = express.Router();

router.post('/manager/login', managerController.login);
router.get('/managers', managerController.getManagerData);
router.put('/managers', managerController.acceptOrder);
router.put('/manager/items', managerController.makeItemUnavailable);
router.post('/manager/add', managerController.addItem);
router.delete('/home/manager/items', managerController.deleteItem);
router.post('/manager/sendbill', managerController.sendBill);
router.get('/home/:id/:category/bill', managerController.getBill);
router.get('/manager/bill', managerController.getManagerNotification);
router.post('/manager/bill', managerController.getManagerBill);
router.get('/manager/bill/:id', managerController.getSpecificManagerBill);
router.get('/chef', managerController.getChefData);
router.put('/manager/bill', managerController.updateOrderStatusToJustPaid);
router.put('/manager/bill/remove', managerController.updateOrderStatusToPaid);
router.post('/home/:id/:category/reviews', managerController.addReview);
router.get('/home/:id/:category/reviews', managerController.getReviews);

module.exports = router;
