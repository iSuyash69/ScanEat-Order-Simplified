
  // controllers/managerController.js
const managerModel = require('../models/managerModel');

const managerController = {
    login: (req, res) => {
      const { username, password } = req.body;
      managerModel.authenticateManager(username, password, (result) => {
        res.send(result);
      });
    },
  
    getManagerData: (req, res) => {
      managerModel.getManagerData((result) => {
        res.status(200).send(result);
      });
    },
  
    acceptOrder: (req, res) => {
      const { order_id } = req.body;
      managerModel.acceptOrder(order_id, (result) => {
        res.send(result);
      });
    },
  
    makeItemUnavailable: (req, res) => {
      const { item_id, status } = req.body;
      managerModel.makeItemUnavailable(item_id, status, (result) => {
        res.status(200).json({ message: result });
      });
    },
  
    addItem: (req, res) => {
      const { itemData } = req.body;
      managerModel.addItem(itemData, (result) => {
        res.status(result.error ? 500 : 200).json(result);
      });
    },
  
    deleteItem: (req, res) => {
      const { id } = req.body;
      managerModel.deleteItem(id, (result) => {
        res.status(result.error ? 500 : 200).json(result);
      });
    },
  
    sendBill: (req, res) => {
      const { table_id } = req.body;
      managerModel.sendBill(table_id, (result) => {
        res.status(result.error ? 500 : 200).send(result);
      });
    },
  
    getBill: (req, res) => {
      const { id, category } = req.params;
      managerModel.getBill(id, category, (result) => {
        res.status(200).send(result);
      });
    },
  
    getManagerNotification: (req, res) => {
      managerModel.getManagerNotification((result) => {
        res.status(200).send(result);
      });
    },
  
    getManagerBill: (req, res) => {
      managerModel.getManagerBill((result) => {
        res.status(200).send(result);
      });
    },
  
    getSpecificManagerBill: (req, res) => {
      const { id } = req.params;
      managerModel.getSpecificManagerBill(id, (result) => {
        res.status(200).send(result);
      });
    },
  
    getChefData: (req, res) => {
      managerModel.getChefData((result) => {
        res.status(200).send(result);
      });
    },
  
    updateOrderStatusToJustPaid: (req, res) => {
      const { table_id } = req.body;
      managerModel.updateOrderStatusToJustPaid(table_id, (result) => {
        res.status(result.error ? 500 : 200).send(result);
      });
    },
  
  // ... (previous code)

  updateOrderStatusToPaid: (req, res) => {
    const { id } = req.body;
    managerModel.updateOrderStatusToPaid(id, (result) => {
      res.status(result.error ? 500 : 200).send(result);
    });
  },

  addReview: (req, res) => {
    const { stars } = req.body;
    managerModel.addReview(stars, (result) => {
      res.status(result.error ? 500 : 200).send(result);
    });
  },

  getReviews: (req, res) => {
    managerModel.getReviews((result) => {
      res.status(result.error ? 500 : 200).send(result);
    });
  },
};

module.exports = managerController;
