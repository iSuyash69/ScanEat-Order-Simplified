// models/managerModel.js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'restaurants',
  password: "manager"
});

const managerModel = {
  authenticateManager: (username, password, callback) => {
    const authquery = `SELECT * FROM managers WHERE name=? AND password=?`;
    connection.query(authquery, [username, password], (err, result) => {
      try {
        if (err) {
          throw err;
        } else {
          if (result.length > 0) {
            callback("1");
          } else {
            callback("0");
          }
        }
      } catch (err) {
        console.log(err);
        callback("An error occurred");
      }
    });
  },

  getManagerData: (callback) => {
    const Manquery = `SELECT
      O.order_id,
      T.table_number,
      OI.item_id,
      MI.name AS item_name,
      MI.price,
      OI.quantity,
      OS.status_name AS status
    FROM Orders AS O 
    JOIN Tables AS T ON O.table_id = T.table_id
    JOIN OrderItems AS OI ON O.order_id = OI.order_id
    JOIN MenuItems AS MI ON OI.item_id = MI.item_id
    JOIN OrderStatuses AS OS ON O.status_id = OS.status_id
    WHERE O.status_id !=5`;

    connection.query(Manquery, (err, result) => {
      try {
        if (err) throw err;
        callback(result);
      } catch (err) {
        console.log(err);
        callback([]);
      }
    });
  },

  acceptOrder: (order_id, callback) => {
    const Macceptquery = `UPDATE orders 
                          SET  status_id=2 
                          WHERE order_id=?
                         `;

    connection.query(Macceptquery, order_id, (err, result) => {
      try {
        if (err) throw err;
        callback("Order accepted successfully");
      } catch (err) {
        callback({ error: err.message });
      }
    });
  },

  makeItemUnavailable: (item_id, status, callback) => {
    const unavlquery = `UPDATE menuitems
                        SET availability=${status}
                        WHERE item_id=${item_id}`;

    connection.query(unavlquery, (err, result) => {
      try {
        if (err) throw err;
        callback("Data updated successfully");
      } catch (err) {
        callback({ error: "An error occurred while updating the data" });
      }
    });
  },

  addItem: (itemData, callback) => {
    const addquery = `INSERT INTO 
      MenuItems (item_id, name, description, price, Maincategory, src, Subcategory, Recommended, Availability, Vegonly)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(addquery, [itemData.item_id, itemData.name, itemData.description, itemData.price, itemData.Maincategory, itemData.src, itemData.Subcategory, itemData.Recommended, 1, itemData.vegonly], (err, result) => {
      if (err) {
        console.error(err);
        callback({ error: "An error occurred while adding data." });
      }
      callback({ message: "Data added successfully." });
    });
  },

  deleteItem: (id, callback) => {
    const delquery = `DELETE FROM MenuItems WHERE item_id=${id}`;

    connection.query(delquery, (err, result) => {
      if (err) {
        console.error(err);
        callback({ error: "An error occurred while deleting data." });
      }
      callback({ message: "Data Deleted successfully." });
    });
  },

  sendBill: (table_id, callback) => {
    const query = `UPDATE orders
                    SET status_id=6
                    WHERE  table_id=${table_id} AND status_id=3;`;

    connection.query(query, (err, result) => {
      try {
        if (err) throw err;
        callback("Status updated successfully");
      } catch (err) {
        callback("An error occurred while sending bill");
      }
    });
  },

  getBill: (id, category, callback) => {
    const bill = `SELECT
      OI.item_id,
      MI.name AS item_name,
      MI.price,
      OI.quantity,
      (MI.price * OI.quantity) AS total_price
    FROM Orders AS O
    JOIN OrderItems AS OI ON O.order_id = OI.order_id
    JOIN MenuItems AS MI ON OI.item_id = MI.item_id
    WHERE O.table_id = (SELECT table_id FROM Tables WHERE table_number =${id}) 
    AND O.status_id = 6;
  `;

    connection.query(bill, (err, result) => {
      try {
        if (err) throw err;
        callback(result);
      } catch (err) {
        callback([]);
      }
    });
  },

  getManagerNotification: (callback) => {
    const { id } = abc;
    callback(id);
  },

  getManagerBill: (callback) => {
    const { id } = abc;

    const bill = `SELECT
      OI.item_id,
      MI.name AS item_name,
      MI.price,
      OI.quantity,
      (MI.price * OI.quantity) AS total_price
    FROM Orders AS O
    JOIN OrderItems AS OI ON O.order_id = OI.order_id
    JOIN MenuItems AS MI ON OI.item_id = MI.item_id
    WHERE O.table_id = (SELECT table_id FROM Tables WHERE table_number =${id}) 
    AND O.status_id = 3;
  `;

    connection.query(bill, (err, result) => {
      try {
        if (err) throw err;
        callback(result);
      } catch (err) {
        callback([]);
      }
    });
  },

  getSpecificManagerBill: (id, callback) => {
    const bill = `SELECT
      OI.item_id,
      MI.name AS item_name,
      MI.price,
      OI.quantity,
      (MI.price * OI.quantity) AS total_price
    FROM Orders AS O
    JOIN OrderItems AS OI ON O.order_id = OI.order_id
    JOIN MenuItems AS MI ON OI.item_id = MI.item_id
    WHERE O.table_id = (SELECT table_id FROM Tables WHERE table_number =${id}) 
    AND O.status_id = 3;
  `;

    connection.query(bill, (err, result) => {
      try {
        if (err) throw err;
        callback(result);
      } catch (err) {
        callback([]);
      }
    });
  },

  getChefData: (callback) => {
    const chefdataquery = `SELECT
      OI.order_id,
      MI.name AS item_name,
      OI.quantity,
      OI.special_instructions,
      O.table_id AS table_number
    FROM OrderItems AS OI
    JOIN Orders AS O ON OI.order_id = O.order_id
    JOIN MenuItems AS MI ON OI.item_id = MI.item_id
    WHERE O.status_id=2;
  `;

    connection.query(chefdataquery, (err, result) => {
      try {
        if (err) throw err;
        callback(result);
      } catch (err) {
        callback([]);
      }
    });
  },

  updateOrderStatusToJustPaid: (table_id, callback) => {
    const query = `UPDATE orders
      SET status_id=4
      WHERE table_id=${table_id} AND status_id=6; `;
    connection.query(query, (err, result) => {
      try {
        if (err) throw err;
        callback("Status updated successfully");
      } catch (err) {
        callback("An error occurred while updating status");
      }
    });
  },

  updateOrderStatusToPaid: (id, callback) => {
    const query = `UPDATE orders
      SET status_id=5
      WHERE table_id=${id} AND status_id=4`;
    connection.query(query, (err, result) => {
      try {
        if (err) throw err;
        callback("Status updated successfully");
      } catch (err) {
        callback("An error occurred while updating status");
      }
    });
  },

  addReview: (stars, callback) => {
    const query = "INSERT INTO reviews (stars) VALUES (?)";

    connection.query(query, [stars], (err, result) => {
      if (err) {
        console.log(err);
        callback("An error occurred while adding a review");
      }
      callback("Review added successfully");
    });
  },

  viewReviews: (callback) => {
    const query = `SELECT 
              avg(stars)  AS Average
             FROM reviews`;
    const getstars = `SELECT stars,count(stars) AS Count
                  FROM reviews 
                  GROUP BY stars`;

    connection.query(query, (err, result1) => {
      try {
        if (err) throw err;
        connection.query(getstars, (err, result2) => {
          try {
            if (err) throw err;

            const reviewResult = {
              avgstars: result1,
              starsCount: result2
            }
            callback(reviewResult);
          } catch (err) {
            console.log(err);
            callback("An error while getting stars count");
          }
        })
      } catch (err) {
        console.log(err);
        callback("An error while getting average of stars ");
      }
    })
  }
};

module.exports = managerModel;
