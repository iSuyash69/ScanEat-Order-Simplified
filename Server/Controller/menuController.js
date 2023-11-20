// controllers/menuController.js
const menuModel = require('../models/menuModel');

const menuController = {
  getItems: (req, res) => {
    menuModel.getItems((result) => {
      res.send(result);
    });
  },

  getCategoryItems: (req, res) => {
    const { category } = req.params;
    menuModel.getCategoryItems(category, (result) => {
      res.send(result);
    });
  },

  getVegItems: (req, res) => {
    menuModel.getVegItems((result) => {
      res.send(result);
    });
  },

  getCartItems: (req, res) => {
    const { id } = req.params;
    menuModel.getCartItems(id, (result) => {
      res.status(200).send(result);
    });
  },

  searchItems: (req, res) => {
    const search = req.body.text;
    menuModel.searchItems(search, (result) => {
      res.status(200).send(result);
    });
  },

  placeOrder: (req, res) => {
    const { id } = req.params;
    const obj = req.body;
    menuModel.placeOrder(id, obj, (result) => {
      res.send(result);
    });
  }
};

module.exports = menuController;
