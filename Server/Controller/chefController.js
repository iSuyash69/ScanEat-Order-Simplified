// controllers/chefController.js
const chefModel = require('../models/chefModel');

const chefController = {
  updateOrderStatusToDelivered: (req, res) => {
    const { order_id } = req.body;
    chefModel.updateOrderStatusToDelivered(order_id, (result) => {
      res.status(result.error ? 500 : 200).send(result);
    });
  },
};

module.exports = chefController;
