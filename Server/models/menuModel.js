// models/menuModel.js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'restaurants',
  password: "manager"
});

const menuModel = {
  getItems: (callback) => {
    const display = "SELECT * FROM MenuItems";
    connection.query(display, (err, result) => {
      if (err) throw err;
      callback(result);
    });
  },
  
  getCategoryItems: (category, callback) => {
    const displayCategory = `SELECT * FROM MenuItems WHERE Subcategory = '${category}' OR Maincategory = '${category}' AND Availability = 1`;
    connection.query(displayCategory, (err, result) => {
      if (err) {
        console.error("An error occurred while retrieving data", err);
        callback([]);
      } else {
        callback(result);
      }
    });
  },

  getVegItems: (callback) => {
    const veg = "SELECT * FROM MenuItems WHERE Vegonly = 1 AND Availability=1";
    connection.query(veg, (err, result) => {
      try {
        if (err) throw err;
        callback(result);
      } catch (err) {
        console.log(err);
        callback([]);
      }
    });
  },

  getCartItems: (id, callback) => {
    const cartQuery = `
      SELECT
        O.table_id,
        O.order_id,
        O.status_id,
        O.order_time,
        OI.item_id,
        OI.quantity,
        MI.name,
        MI.src
      FROM Orders AS O
      JOIN OrderItems AS OI ON O.order_id = OI.order_id
      JOIN MenuItems AS MI ON OI.item_id = MI.item_id
      WHERE O.table_id =${id} AND( O.status_id !=4 AND O.status_id!=5);
    `;
    connection.query(cartQuery, (err, result) => {
      if (err) {
        console.error("Error fetching cart:", err);
        callback([]);
      } else {
        callback(result);
      }
    });
  },

  searchItems: (search, callback) => {
    if (search.length < 2) {
      callback([]);
    } else {
      const displaySearch = "SELECT * FROM MenuItems WHERE name LIKE ?";
      try {
        connection.query(displaySearch, `%${search}%`, (err, result) => {
          if (err) throw err;
          callback(result);
        });
      } catch (err) {
        console.log(err);
        callback([]);
      }
    }
  },

  placeOrder: (id, obj, callback) => {
    connection.query(
      `SELECT table_id FROM Tables WHERE table_number = ?`,
      id,
      (err, result) => {
        if (err) {
          callback({ error: err.message });
        }

        const table_id = result[0].table_id;

        connection.query(
          `INSERT INTO Orders (table_id, status_id) VALUES (?, ?)`,
          [table_id, 1],
          (err, orderResult) => {
            if (err) {
              callback({ error: err.message });
            }

            const order_id = orderResult.insertId;

            const insertItemQuery =
              'INSERT INTO OrderItems (order_id, item_id, quantity, special_instructions) VALUES (?, ?, ?, ?)';

            obj.items.forEach((item) => {
              connection.query(
                insertItemQuery,
                [order_id, item.item_id, item.quantity, obj.special_instruction || 'none'],
                (err) => {
                  if (err) {
                    console.log(err);
                    callback({ error: err.message });
                  }
                }
              );
            });

            console.log("Order placed successfully");
            callback({ success: "Order placed successfully" });
          }
        );
      }
    );
  }
};

module.exports = menuModel;

