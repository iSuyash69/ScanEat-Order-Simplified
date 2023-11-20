// analyticsModel.js
const connection = require('path/to/your/database/connection');

class AnalyticsModel {
  static getDailySales(callback) {
    const dailySalesQuery = `
      SELECT
        DATE(O.order_time) AS sale_date,
        SUM(MI.price * OI.quantity) AS daily_sales
      FROM Orders AS O
      JOIN OrderItems AS OI ON O.order_id = OI.order_id
      JOIN MenuItems AS MI ON OI.item_id = MI.item_id
      JOIN Tables AS T ON O.table_id = T.table_id
      WHERE DATE(O.order_time) = CURDATE()
      GROUP BY sale_date
      ORDER BY sale_date
      LIMIT 1;
    `;
    connection.query(dailySalesQuery, callback);
  }

  static getMostSoldItems(callback) {
    const mostSoldItemsQuery = `
      SELECT
        MI.item_id,
        MI.name AS item_name,
        MI.src,
        MI.price,
        SUM(OI.quantity) AS total_quantity_sold
      FROM OrderItems AS OI
      JOIN MenuItems AS MI ON OI.item_id = MI.item_id
      JOIN Orders AS O ON O.order_id = OI.order_id
      JOIN Tables AS T ON O.table_id = T.table_id
      GROUP BY MI.item_id
      ORDER BY total_quantity_sold DESC
      LIMIT 10;
    `;
    connection.query(mostSoldItemsQuery, callback);
  }

  static getMostSoldOrders(callback) {
    const mostSoldOrdersQuery = `
      SELECT
        O.order_id,
        T.table_number,
        SUM(MI.price * OI.quantity) AS total_order_sales
      FROM Orders AS O
      JOIN OrderItems AS OI ON O.order_id = OI.order_id
      JOIN MenuItems AS MI ON OI.item_id = MI.item_id
      JOIN Tables AS T ON O.table_id = T.table_id
      GROUP BY O.order_id
      ORDER BY total_order_sales DESC
      LIMIT 10;
    `;
    connection.query(mostSoldOrdersQuery, callback);
  }

  static getMostOrderedTable(callback) {
    const mostOrderedTableQuery = `
      SELECT
        T.table_number,
        SUM(MI.price * OI.quantity) AS total_order_sales
      FROM Orders AS O
      JOIN OrderItems AS OI ON O.order_id = OI.order_id
      JOIN Tables AS T ON O.table_id = T.table_id
      JOIN MenuItems AS MI ON OI.item_id = MI.item_id
      GROUP BY T.table_number
      ORDER BY total_order_sales DESC
      LIMIT 5;
    `;
    connection.query(mostOrderedTableQuery, callback);
  }

  static getTotalSales(callback) {
    const totalSalesQuery = `
      SELECT
        DATE(O.order_time) AS order_date,
        COUNT(OI.order_id) AS total_orders,
        SUM(MI.price * OI.quantity) AS total_price
      FROM Orders AS O
      JOIN OrderItems AS OI ON O.order_id = OI.order_id
      JOIN MenuItems AS MI ON OI.item_id = MI.item_id
      WHERE DATE(O.order_time) = CURDATE()
      GROUP BY order_date;
    `;
    connection.query(totalSalesQuery, callback);
  }

  static getAvgStars(callback) {
    const avgStarsQuery = `
      SELECT 
        AVG(stars) AS Average
      FROM reviews;
    `;
    connection.query(avgStarsQuery, callback);
  }

  static getCountByStars(callback) {
    const countByStarsQuery = `
      SELECT 
        stars,
        COUNT(stars) AS Count
      FROM reviews 
      GROUP BY stars;
    `;
    connection.query(countByStarsQuery, callback);
  }

  // Add more functions as needed...
}

module.exports = AnalyticsModel;
