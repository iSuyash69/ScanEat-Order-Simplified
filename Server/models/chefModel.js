// models/chefModel.js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'restaurants',
  password: "manager"
});

const chefModel = {
  updateOrderStatusToDelivered: (order_id, callback) => {
    const query = `UPDATE orders
                   SET status_id=3
                   WHERE order_id=?`;
    connection.query(query,{order_id}, (err, result) => {
      if (err) {
        callback({ error: "An error occurred while updating status" });
      } else {
        callback({ success: "Status changed successfully" });
      }
    });
  },
};

module.exports = chefModel;
