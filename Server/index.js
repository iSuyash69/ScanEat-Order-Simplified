const express = require("express");
const app = express();
const cors = require('cors');
const port = 8080;
const mysql = require("mysql2");
const bcrypt = require('bcrypt');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'restaurants',
  password: "manager"
});



let abc = 0;
let obj;
//<-----------------------------------------------------listen ----------------------------------------------->
app.listen(port, (req, res) => {

  console.log("listening to the port ", port);
})


//<----------------------------------------------------home page----------------------------------------------------->

app.get("/home/:id", (req, res) => {
  // res.send("hello");
  let table_id = req.params;
  let display = "Select * from MenuItems";
  // console.log("get request recieved");
  try {
    connection.query(display, (err, result) => {
      if (err) throw err;
      res.send(result);
    })
  } catch (err) {
    console.log(err);
  }
})
//<-----------------------------------------------------Function ----------------------------------------------------->
const categoryfunc = (category, res) => {
  let displaycategory = `SELECT * FROM MenuItems WHERE Subcategory = '${category}' OR Maincategory = '${category}' AND Availability = 1`;
  connection.query(displaycategory, (err, result) => {
    if (err) {
      console.error("An error occurred while retrieving data", err);
      res.status(500).send("An error occurred while retrieving data");
    } else {
      res.send(result);
    }
  });
}

//<-----------------------------------------------------category ----------------------------------------------------->
app.get("/home/:id/:category", (req, res) => {
  const { category } = req.params;
  // console.log("Category:", category); 
  categoryfunc(category, res);
});
//-----------------------------------------------------only veg----------------------------------------------------->

app.get("/veg", (req, res) => {
  let veg = "SELECT * FROM MenuItems WHERE Vegonly = 1 AND Availability=1";

  connection.query(veg, (err, result) => {
    try {
      if (err) throw err;
      res.send(result);

    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });
});
//<-----------------------------------------------------CART----------------------------------------------------->
app.get("/home/:id/abc/cart", (req, res) => {
  const { id } = req.params; // Use 'id' to match the route parameter
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
  // console.log(id);
  connection.query(cartQuery, (err, res1) => {
    if (err) {
      console.error("Error fetching cart:", err);
      res.status(500).send("An error occurred while fetching the cart.");
    } else {
      res.status(200).send(res1);
      // console.log(res1);
    }
  });
});



//<-----------------------------------------------------SEARCH FUNCTION----------------------------------------------------->
app.post("/home/:id", (req, res) => {
  const search = req.body.text;
  // console.log(req.body.text);
  if (search.length < 2) {
    res.send("");
  }
  else {
    const displaysearch = "SELECT * FROM MenuItems WHERE name LIKE ?";
    // console.log("search request recieved");
    try {
      connection.query(displaysearch, `%${search}%`, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
      });
    } catch (err) {
      res.status.send("an error occured while searching ")
      console.log(err);
    }
  }

});
//----------------------------------------------------- PLACE ORDER FUNCTION----------------------------------------------------->
app.post("/home/:id/abc/placeOrder", (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  // console.log(obj.items);
  // console.log(obj.special_instruction);
  connection.query(
    `SELECT table_id FROM Tables WHERE table_number = ?`,
    id,
    (err, result) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      const table_id = result[0].table_id; // Assuming it's a single result
      connection.query(
        `INSERT INTO Orders (table_id, status_id) VALUES (?, ?)`,
        [table_id, 1],
        (err, orderResult) => {
          if (err) {
            return res.status(500).send(err.message);
          }

          const order_id = orderResult.insertId; // Get the inserted order_id

          const insertItemQuery =
            'INSERT INTO OrderItems (order_id, item_id, quantity, special_instructions) VALUES (?, ?, ?, ?)'; // Add closing parenthesis

          obj.items.forEach((item) => {
            connection.query(
              insertItemQuery,
              [order_id, item.item_id, item.quantity, obj.special_instruction || 'none'],
              (err) => {
                if (err) {
                  console.log(err);
                  return res.status(500).send(err.message);
                }
              }
            );
          });

          console.log("Order placed successfully");
          res.send("Order placed successfully");
        }
      );
    }
  );
});



//<-----------------------------------------------Reviews




/////////////////////////////////////////////////////MANAGER's page//////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


//<-----------------------------------------------------authentication of managers----------------------------------------------------->
app.post("/manager/login", (req, res) => {

  const { username, password } = req.body;
  const authquery = `SELECT * FROM managers WHERE name=? AND password=?`;

  console.log(username);
  console.log(password);

  connection.query(authquery, [username, password], (err, result) => {
    try {
      if (err) {
        throw err;
      } else {
        if (result.length > 0) {
          res.send("1");
        } else {
          res.send("0");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred");
    }
  });
});




//<---------------------------------------------------------manager page data -------------------------------------------------------->
app.get('/managers', (req, res) => {
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

  // console.log("manager get request");
  connection.query(Manquery, (err, result) => {
    try {
      if (err) throw err;
      res.status(200).send(result);

    } catch (err) {
      console.log(err);
      res.status(500).send("AN error occured while fetching data");

    }
  })

})


//<----------------------------------------------------------ACCEPT ORDER-------------------------------------------------------->


app.put("/managers", (req, res) => {
  const { order_id, item_id, quantity } = req.body;

  let Macceptquery = `UPDATE orders 
                    SET  status_id=2 
                    WHERE order_id=?
                    
                   `;
  connection.query(Macceptquery, order_id, (err, result) => {
    try {
      if (err) throw err;
      res.send("order accepted successfully");
    } catch (err) {
      res.status(500).send(err);
    }
  })
})
//-----------------------------------------------------Make unavailable item----------------------------------------------------->
app.put("/manager/items", (req, res) => {
  const { item_id, status } = req.body;
  const unavlquery = ` UPDATE menuitems
                    SET availability=${status}
                    WHERE item_id=${item_id}`;

  connection.query(unavlquery, (err, result) => {
    try {
      if (err) throw err;
      return res.status(200).json({ message: "Data updated successfully." });
    } catch (err) {
      res.status(500).send("An error occured while updating the data");
    }
  })
})


//<-----------------------------------------------------ADD ITEM----------------------------------------------------->
app.post("/manager/add", (req, res) => {
  const { itemData } = req.body;

  const addquery = `INSERT INTO 
  MenuItems (item_id, name, description, price, Maincategory, src, Subcategory, Recommended, Availability, Vegonly)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  console.log(itemData.item_id, itemData.name, itemData.description, itemData.price, itemData.Maincategory, itemData.src, itemData.Subcategory, itemData.Recommended, itemData.vegonly);


  connection.query(addquery, [itemData.item_id, itemData.name, itemData.description, itemData.price, itemData.Maincategory, itemData.src, itemData.Subcategory, itemData.Recommended, 1, itemData.vegonly], (err, result) => {
    if (err) {

      console.error(err);
      return res.status(500).json({ error: "An error occurred while adding data." });
    }
    return res.status(200).json({ message: "Data added successfully." });
  });
});




//<-----------------------------------------------------Delete Item--------------------------------------------------------->
app.delete("/home/manager/items", (req, res) => {
  let { id } = req.body;
  const delquery = `DELETE FROM MenuItems WHERE item_id=${id}`;

  connection.query(delquery, (err, result) => {
    if (err) {

      console.error(err);
      return res.status(500).json({ error: "An error occurred while deleting data." }); ``
    }
    return res.status(200).json({ message: "Data Deleted successfully." });
  });


})









//<-----------------------------------------------------manager request send bill------------------------------------------------------->
app.post("/manager/sendbill", (req, res) => {
  const { table_id } = req.body;
  const query = `UPDATE orders
SET status_id=6
WHERE  table_id=${table_id} AND status_id=3;`
  connection.query(query, (err, result) => {
    try {
      if (err) throw err;
      res.status(200).send("status updated successfully");
    } catch (err) {
      res.status(500).send("An error occured while sending bill");
    }

  })
})


////////////////////////////////////////////////////////BILL GENERATION customer side/////////////////////////////////////////////
app.get("/home/:id/:category/bill", (req, res) => {
  const id = req.params;
  abc = id;

  //   const bill = `SELECT
  //   OI.item_id,
  //   MI.name AS item_name,
  //   MI.price, 
  //   OI.quantity,
  //   (MI.price * OI.quantity) AS total_price
  // FROM Orders AS O
  // JOIN OrderItems AS OI ON O.order_id = OI.order_id
  // JOIN MenuItems AS MI ON OI.item_id = MI.item_id
  // WHERE O.table_id = (SELECT table_id FROM Tables WHERE table_number =${id}) 
  // AND O.status_id = 6;
  // `

  //   connection.query(bill, (err, result) => {
  //     try {
  //       if (err) throw err;
  //       res.status(200).send(result)

  //     } catch (err) {
  //       res.status(500).send("an error occured");
  //       console.log(err);
  //     }
  //   })

})


//<-----------------------------------------------------BILL GENERATED----------------------------------------------------->
app.post("/home/:id/:category/bill", (req, res) => {
  const { id, category } = req.params;
  // console.log(id);
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
`
  // console.log(id);
  connection.query(bill, (err, result) => {
    try {
      if (err) throw err;
      // console.log(result);
      res.status(200).send(result)

    } catch (err) {
      res.status(500).send("an error occured");
      console.log(err);
    }
  })
})

//<-----------------------------------------------------bill genration notification----------------------------------------------------->
app.get("/manager/bill", (req, res) => {
  const { id } = abc;
  // console.log("notification")
  res.status(200).send(id);
  // console.log(id);

})
//<-----------------------------------------------------BILL GENERATION MANAGER SIDE----------------------------------------------------->
app.post("/manager/bill", (req, res) => {
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
`
  console.log(id);
  connection.query(bill, (err, result) => {
    try {
      if (err) throw err;
      res.status(200).send(result)

    } catch (err) {
      res.status(500).send("an error occured");
      console.log(err);
    }
  })
})
//////////////////////////////////////////////////CHEF///////////////////////////////////////////////
// app.get("/chef", (req, res) => {
//   const chefdataquery = `SELECT
//   OI.order_id,
//   MI.name AS item_name,
//   OI.quantity,
//   -- OI.special_instructions,
//   O.table_id AS table_number
// FROM OrderItems AS OI
// JOIN Orders AS O ON OI.order_id = O.order_id
// JOIN MenuItems AS MI ON OI.item_id = MI.item_id
// WHERE O.status_id=2;
// `;
//   const instquery = `SELECT OI.order_id, OI.special_instructions
// FROM OrderItems AS OI
// JOIN Orders AS O ON OI.order_id = O.order_id
// WHERE O.status_id = 2
// GROUP BY O.order_id, OI.special_instructions;
// `;
//   connection.query(chefdataquery, (err, result) => {
//     try {
//       if (err) throw err;
//       // res.send(result);
//       connection.query(instquery, (err, res2) => {
//         try {
//           if (err) throw err;
//           const orderitems = {
//             order: result,
//             instructions: res2
//           }
//           // console.log(orderitems);
//           res.status(200).send(orderitems);
//         } catch (err) {
//           res.status(500).send("an error occured");
//           console.log(err);

//         }
//       })
//     } catch (err) {
//       return res.status(500).json({ error: "An error occurred while getting data." });
//     }
//   })

// })
//_<-----------------------------------------------------BILL generation----------------------------------------------------->
app.get("/manager/bill/:id", (req, res) => {
  const { id } = req.params;
  // console.log(id);
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
`
  // console.log(id);
  connection.query(bill, (err, result) => {
    try {
      if (err) throw err;
      res.status(200).send(result)
      // console.log(result);

    } catch (err) {
      res.status(500).send("an error occured");
      console.log(err);
    }
  })
})
//<---------------------------------------------------CHEF----------------------------------------------------->
app.get("/chef", (req, res) => {
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
      res.status(200).send(result);

    } catch (err) {
      return res.status(500).json({ error: "An error occurred while getting data." });
    }
  })

})

/////////////////////////////////////////////chef expected time//////////////////////////////////////////////
// app.post("/home")
//<-----------------------------------------------------Delivered status------------------------------------------------------------>
app.put("/chef", (req, res) => {
  const { order_id } = req.body;
  const query = `UPDATE orders
                SET status_id=3
                WHERE order_id=${order_id}`
  console.log("patch request recieved")
  connection.query(query, (err, result) => {
    try {
      if (err) throw err;
      res.status(200).send("status changed successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occured while updating status")
    }
  })
})

//<-----------------------------------------------------justpaid Status----------------------------------------------------->
app.put("/manager/bill", (req, res) => {
  const { table_id } = req.body;
  const query = `UPDATE orders
    SET status_id=4
    WHERE table_id=${table_id} AND status_id=6; `;
  connection.query(query, (err, result) => {
    try {
      if (err) throw err;
      res.status(200).send("status updated succefully");
      // console.log("justpaiddddddddS")
    } catch (err) {
      console.log(err);
      res.status(500).send("AN error occured while updating status");
    }
  })

})
//-----------------------------------------------------paid status----------------------------------------------------->
app.put("/manager/bill/remove", (req, res) => {
  const { id } = req.body;
  console.log(id);
  const query = `UPDATE orders
    SET status_id=5
    WHERE table_id=${id} AND status_id=4`;
  // console.log(table_id);
  connection.query(query, (err, result) => {
    try {
      if (err) throw err;
      res.status(200).send("status updated succefully");
    } catch (err) {
      console.log(err);
      res.status(500).send("AN error occured while updating status");
    }
  })


})

//<------------------------------------------------- Add Reviews------------------------------------------------------------------>
app.post("/home/:id/:category/reviews", (req, res) => {
  const { stars } = req.body;
  const query = "INSERT INTO reviews (stars) VALUES (?)";

  connection.query(query, [stars], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("An error occurred while adding a review");
    }
    res.status(200).send("Review added successfully");
  });
});
//<-----------------------------------------------View Reviews-------------------------------------------------->
app.get("/home/:id/:category/reviews", (req, res) => {
  const query = `SELECT 
              avg(stars)  AS Average
             FROM reviews`
  const getstars = `SELECT stars,count(stars) AS Count
                  FROM reviews 
                  GROUP BY stars`
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
          res.status(200).send(reviewResult);
        } catch (err) {
          console.log(err);
          res.status(500).send("An error while getting stars count");
        }
      })
    } catch (err) {
      console.log(err);
      res.status(500).send("An error while getting average of stars ");
    }
  })
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////ANALYTICS///////////////////////////////////////////////////////////
app.post("/manager/analytics", (req, res) => {
  const { data } = req.body;
  // console.log(data);

  if (data == 'All' || data == 'all') {
    const dailySalesQuery = `
    SELECT
        DATE(O.order_time) AS sale_date,
        SUM(MI.price * OI.quantity) AS daily_sales
    FROM Orders AS O
    JOIN OrderItems AS OI ON O.order_id = OI.order_id
    JOIN MenuItems AS MI ON OI.item_id = MI.item_id
    JOIN Tables AS T ON O.table_id = T.table_id
    -- WHERE T.table_number = ?
    GROUP BY sale_date
    ORDER BY sale_date;
  `;

    // Query for most sold items
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
    -- WHERE T.table_number = ?
    GROUP BY MI.item_id
    ORDER BY total_quantity_sold DESC
    LIMIT 10;
  `;

    // Query for most sold orders 
    const mostSoldOrdersQuery = `
    SELECT
        O.order_id,
        T.table_number,
        SUM(MI.price * OI.quantity) AS total_order_sales
    FROM Orders AS O
    JOIN OrderItems AS OI ON O.order_id = OI.order_id
    JOIN MenuItems AS MI ON OI.item_id = MI.item_id
    JOIN Tables AS T ON O.table_id = T.table_id
    -- WHERE T.table_number = ?
    GROUP BY O.order_id
    ORDER BY total_order_sales DESC
    LIMIT 10;
  `;
    // Query for most ordered table 
    const mostOrderedTable = `SELECT
                T.table_number,
                SUM(MI.price * OI.quantity) AS total_order_sales
                FROM Orders AS O
                JOIN OrderItems AS OI ON O.order_id = OI.order_id
                JOIN Tables AS T ON O.table_id = T.table_id
                JOIN MenuItems AS MI ON OI.item_id = MI.item_id
                GROUP BY T.table_number
                ORDER BY total_order_sales DESC
                LIMIT 5 `;
    ;

    connection.query(dailySalesQuery, (err, dailySalesResult) => {
      if (err) {
        console.error(err);
        return res.status(500).send("An error occurred while fetching daily sales data");
      }

      connection.query(mostSoldItemsQuery, (err, mostSoldItemsResult) => {
        if (err) {
          console.error(err);
          return res.status(500).send("An error occurred while fetching most sold items");
        }

        connection.query(mostSoldOrdersQuery, (err, mostSoldOrdersResult) => {
          if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while fetching most sold orders");
          }
          connection.query(mostOrderedTable, (err, mostOrderedTableResult) => {
            if (err) {
              console.error(err);
              return res.status(500).send("An error occurred while fetching most sold orders on table");
            }
            const response = {
              dailySales: dailySalesResult,
              mostSoldItems: mostSoldItemsResult,
              mostSoldOrders: mostSoldOrdersResult,
              mostOrderedTable: mostOrderedTableResult
            };

            res.json(response);
          })

        });
      });
    });
  }
  else if (data == 'daily' || data == 'Daily') {
    const dailySalesQuery = `
  SELECT
      DATE(O.order_time) AS sale_date,
      SUM(MI.price * OI.quantity) AS daily_sales
  FROM Orders AS O
  JOIN OrderItems AS OI ON O.order_id = OI.order_id
  JOIN MenuItems AS MI ON OI.item_id = MI.item_id
  JOIN Tables AS T ON O.table_id = T.table_id
  -- WHERE T.table_number = ?
  WHERE DATE(O.order_time) = CURDATE() 
  GROUP BY sale_date
  ORDER BY sale_date
  LIMIT 1;
`;

    // Query for most sold items
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
WHERE DATE(O.order_time) = CURDATE()  
GROUP BY MI.item_id
ORDER BY total_quantity_sold DESC
LIMIT 10;

`;

    // Query for most sold orders 
    const mostSoldOrdersQuery = `
  SELECT
      O.order_id,
      T.table_number,
      SUM(MI.price * OI.quantity) AS total_order_sales
  FROM Orders AS O
  JOIN OrderItems AS OI ON O.order_id = OI.order_id
  JOIN MenuItems AS MI ON OI.item_id = MI.item_id
  JOIN Tables AS T ON O.table_id = T.table_id
  -- WHERE T.table_number = ?
  WHERE DATE(O.order_time) = CURDATE() 
  GROUP BY O.order_id
  ORDER BY total_order_sales DESC
  LIMIT 10;
`;
    // Query for most ordered table 
    const mostOrderedTable = `SELECT
              T.table_number,
              SUM(MI.price * OI.quantity) AS total_order_sales
              FROM Orders AS O
              JOIN OrderItems AS OI ON O.order_id = OI.order_id
              JOIN Tables AS T ON O.table_id = T.table_id
              JOIN MenuItems AS MI ON OI.item_id = MI.item_id
              WHERE DATE(O.order_time) = CURDATE() 
              GROUP BY T.table_number
              ORDER BY total_order_sales DESC
              LIMIT 5`;
    ;
    // Query for total no of orders and total no of sales
    const totalSales = `SELECT
                  DATE(O.order_time) AS order_date,
                  COUNT(OI.order_id) AS total_orders,
                  SUM(MI.price * OI.quantity) AS total_price
                  FROM Orders AS O
                  JOIN OrderItems AS OI ON O.order_id = OI.order_id
                  JOIN MenuItems AS MI ON OI.item_id = MI.item_id
                  WHERE DATE(O.order_time) = CURDATE()  
                  GROUP BY order_date;
                `

    //Query for Reviews
    const avgStarsQuery = `SELECT 
                      AVG(stars) AS Average
                      FROM reviews;`;
    const countByStars = `SELECT 
                        stars,
                        count(stars) AS Count
                        FROM reviews 
                        GROUP BY stars`
    connection.query(dailySalesQuery, (err, dailySalesResult) => {
      if (err) {
        console.error(err);
        return res.status(500).send("An error occurred while fetching daily sales data");
      }

      connection.query(mostSoldItemsQuery, (err, mostSoldItemsResult) => {
        if (err) {
          console.error(err);
          return res.status(500).send("An error occurred while fetching most sold items");
        }

        connection.query(mostSoldOrdersQuery, (err, mostSoldOrdersResult) => {
          if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while fetching most sold orders");
          }
          connection.query(mostOrderedTable, (err, mostOrderedTableResult) => {
            if (err) {
              console.error(err);
              return res.status(500).send("An error occurred while fetching most sold orders on table");
            }
            connection.query(totalSales, (err, totalSalesResult) => {
              if (err) {
                console.error(err);
                return res.status(500).send("An error occurred while fetching total sales");
              }
              connection.query(avgStarsQuery, (err, reviewResult) => {
                if (err) {
                  console.error(err);
                  return res.status(500).send("An error occurred while fetching reviews");
                }
                connection.query(countByStars, (err, countResult) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).send("An error occurred while fetching reviews Count");
                  }

                  const response = {
                    dailySales: dailySalesResult,
                    mostSoldItems: mostSoldItemsResult,
                    mostSoldOrders: mostSoldOrdersResult,
                    mostOrderedTable: mostOrderedTableResult,
                    totalSalesOrder: totalSalesResult,
                    Avearage: reviewResult,
                    starsCount: countResult
                  };

                  res.json(response);
                })


              })

            })

          })

        });
      });
    });
  }
  else if (data == 'weekly' || data == 'Weekly') {
    const dailySalesQuery = `
  SELECT
      DATE(O.order_time) AS sale_date,
      SUM(MI.price * OI.quantity) AS daily_sales
  FROM Orders AS O
  JOIN OrderItems AS OI ON O.order_id = OI.order_id
  JOIN MenuItems AS MI ON OI.item_id = MI.item_id
  JOIN Tables AS T ON O.table_id = T.table_id
  -- WHERE T.table_number = ?
  WHERE YEAR(O.order_time)=YEAR(CURDATE()) AND 
  WEEK(O.order_time) = WEEK(CURDATE() )
  GROUP BY sale_date
  ORDER BY sale_date;
`;

    // Query for most sold items
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
  -- WHERE T.table_number = ?
  WHERE YEAR(O.order_time)=YEAR(CURDATE()) AND
    WEEK(O.order_time) = WEEK(CURDATE()) 
  GROUP BY MI.item_id
  ORDER BY total_quantity_sold DESC
  LIMIT 10;
`;

    // Query for most sold orders 
    const mostSoldOrdersQuery = `
  SELECT
      O.order_id,
      T.table_number,
      SUM(MI.price * OI.quantity) AS total_order_sales
  FROM Orders AS O
  JOIN OrderItems AS OI ON O.order_id = OI.order_id
  JOIN MenuItems AS MI ON OI.item_id = MI.item_id
  JOIN Tables AS T ON O.table_id = T.table_id
  -- WHERE T.table_number = ?
  WHERE YEAR(O.order_time)=YEAR(CURDATE()) AND
   WEEK(O.order_time) = WEEK(CURDATE()) 
  GROUP BY O.order_id
  ORDER BY total_order_sales DESC
  LIMIT 10;
`;
    // Query for most ordered table 
    const mostOrderedTable = `SELECT
              T.table_number,
              SUM(MI.price * OI.quantity) AS total_order_sales
              FROM Orders AS O
              JOIN OrderItems AS OI ON O.order_id = OI.order_id
              JOIN Tables AS T ON O.table_id = T.table_id
              JOIN MenuItems AS MI ON OI.item_id = MI.item_id
              WHERE YEAR(O.order_time)=YEAR(CURDATE()) AND
               WEEK(O.order_time) = WEEK(CURDATE()) 
              GROUP BY T.table_number
              ORDER BY total_order_sales DESC
              LIMIT 5`;

    // Query for total no of orders and total no of sales
    const totalSales = `SELECT
        WEEK(O.order_time) AS order_week,
        COUNT(OI.order_id) AS total_orders,
        SUM(MI.price * OI.quantity) AS total_price
        FROM Orders AS O
        JOIN OrderItems AS OI ON O.order_id = OI.order_id
        JOIN MenuItems AS MI ON OI.item_id = MI.item_id
        WHERE WEEK(O.order_time) = WEEK(CURDATE())  
        GROUP BY order_week;
      `;

    //Query for Reviews
    const avgStarsQuery = `SELECT 
            AVG(stars) AS Average
            FROM reviews;`;

    const countByStars = `SELECT 
              stars,
              count(stars) AS Count
              FROM reviews 
              GROUP BY stars`;

    connection.query(dailySalesQuery, (err, dailySalesResult) => {
      if (err) {
        console.error(err);
        return res.status(500).send("An error occurred while fetching daily sales data");
      }

      connection.query(mostSoldItemsQuery, (err, mostSoldItemsResult) => {
        if (err) {
          console.error(err);
          return res.status(500).send("An error occurred while fetching most sold items");
        }

        connection.query(mostSoldOrdersQuery, (err, mostSoldOrdersResult) => {
          if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while fetching most sold orders");
          }
          connection.query(mostOrderedTable, (err, mostOrderedTableResult) => {
            if (err) {
              console.error(err);
              return res.status(500).send("An error occurred while fetching most sold orders on table");
            }
            connection.query(totalSales, (err, totalSalesResult) => {
              if (err) {
                console.error(err);
                return res.status(500).send("An error occurred while fetching total sales");
              }
              connection.query(avgStarsQuery, (err, reviewResult) => {
                if (err) {
                  console.error(err);
                  return res.status(500).send("An error occurred while fetching reviews");
                }
                connection.query(countByStars, (err, countResult) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).send("An error occurred while fetching reviews Count");
                  }

                  const response = {
                    dailySales: dailySalesResult,
                    mostSoldItems: mostSoldItemsResult,
                    mostSoldOrders: mostSoldOrdersResult,
                    mostOrderedTable: mostOrderedTableResult,
                    totalSalesOrder: totalSalesResult,
                    Avearage: reviewResult,
                    starsCount: countResult
                  };

                  res.json(response);
                })


              })

            })
          })

        });
      });
    });
  }
  else if (data == 'monthly' || data == "Monthly") {
    const dailySalesQuery = `
  SELECT
      DATE(O.order_time) AS sale_date,
      SUM(MI.price * OI.quantity) AS daily_sales
  FROM Orders AS O
  JOIN OrderItems AS OI ON O.order_id = OI.order_id
  JOIN MenuItems AS MI ON OI.item_id = MI.item_id
  JOIN Tables AS T ON O.table_id = T.table_id
  -- WHERE T.table_number = ?
  WHERE YEAR(O.order_time)=YEAR(CURDATE()) AND
  MONTH(O.order_time) = MONTH(CURDATE()) 
  GROUP BY sale_date
  ORDER BY sale_date;
`;

    // Query for most sold items
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
  -- WHERE T.table_number = ?
  WHERE YEAR(O.order_time)=YEAR(CURDATE()) AND
  MONTH(O.order_time) = MONTH(CURDATE()) 
  GROUP BY MI.item_id
  ORDER BY total_quantity_sold DESC
  LIMIT 10;
`;

    // Query for most sold orders 
    const mostSoldOrdersQuery = `
  SELECT
      O.order_id,
      T.table_number,
      SUM(MI.price * OI.quantity) AS total_order_sales
  FROM Orders AS O
  JOIN OrderItems AS OI ON O.order_id = OI.order_id
  JOIN MenuItems AS MI ON OI.item_id = MI.item_id
  JOIN Tables AS T ON O.table_id = T.table_id
  -- WHERE T.table_number = ?
  WHERE YEAR(O.order_time)=YEAR(CURDATE()) AND
  MONTH(O.order_time) =MONTH(CURDATE()) 
  GROUP BY O.order_id
  ORDER BY total_order_sales DESC
  LIMIT 10;
`;
    // Query for most ordered table 
    const mostOrderedTable = `SELECT
              T.table_number,
              SUM(MI.price * OI.quantity) AS total_order_sales
              FROM Orders AS O
              JOIN OrderItems AS OI ON O.order_id = OI.order_id
              JOIN Tables AS T ON O.table_id = T.table_id
              JOIN MenuItems AS MI ON OI.item_id = MI.item_id
              WHERE YEAR(O.order_time)=YEAR(CURDATE()) AND
              MONTH(O.order_time) = MONTH(CURDATE()) 
              GROUP BY T.table_number
              ORDER BY total_order_sales DESC
              LIMIT 5`;

    // Query for total no of orders and total no of sales
    const totalSales = `SELECT
                        MONTH(O.order_time) AS order_month,
                        COUNT(OI.order_id) AS total_orders,
                        SUM(MI.price * OI.quantity) AS total_price
                        FROM Orders AS O
                        JOIN OrderItems AS OI ON O.order_id = OI.order_id
                        JOIN MenuItems AS MI ON OI.item_id = MI.item_id
                        WHERE MONTH(O.order_time) =MONTH(CURDATE())  
                       GROUP BY order_month
                        `;

    //Query for Reviews
    const avgStarsQuery = `SELECT 
                AVG(stars) AS Average
                FROM reviews;`;

    const countByStars = `SELECT 
       stars,
       count(stars) AS Count
       FROM reviews 
       GROUP BY stars`;
    connection.query(dailySalesQuery, (err, dailySalesResult) => {
      if (err) {
        console.error(err);
        return res.status(500).send("An error occurred while fetching daily sales data");
      }

      connection.query(mostSoldItemsQuery, (err, mostSoldItemsResult) => {
        if (err) {
          console.error(err);
          return res.status(500).send("An error occurred while fetching most sold items");
        }

        connection.query(mostSoldOrdersQuery, (err, mostSoldOrdersResult) => {
          if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while fetching most sold orders");
          }
          connection.query(mostOrderedTable, (err, mostOrderedTableResult) => {
            if (err) {
              console.error(err);
              return res.status(500).send("An error occurred while fetching most sold orders on table");
            }
            connection.query(totalSales, (err, totalSalesResult) => {
              if (err) {
                console.error(err);
                return res.status(500).send("An error occurred while fetching total sales");
              }
              connection.query(avgStarsQuery, (err, reviewResult) => {
                if (err) {
                  console.error(err);
                  return res.status(500).send("An error occurred while fetching reviews");
                }
                connection.query(countByStars, (err, countResult) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).send("An error occurred while fetching reviews Count");
                  }

                  const response = {
                    dailySales: dailySalesResult,
                    mostSoldItems: mostSoldItemsResult,
                    mostSoldOrders: mostSoldOrdersResult,
                    mostOrderedTable: mostOrderedTableResult,
                    totalSalesOrder: totalSalesResult,
                    Avearage: reviewResult,
                    starsCount: countResult
                  };

                  res.json(response);
                })


              })

            })
          })

        });
      });
    });
  }
  else if (data == 'yearly' || data == 'Yearly') {

    const dailySalesQuery = `
    SELECT
        DATE(O.order_time) AS sale_date,
        SUM(MI.price * OI.quantity) AS daily_sales
    FROM Orders AS O
    JOIN OrderItems AS OI ON O.order_id = OI.order_id
    JOIN MenuItems AS MI ON OI.item_id = MI.item_id
    JOIN Tables AS T ON O.table_id = T.table_id
    -- WHERE T.table_number = ?
    WHERE YEAR(O.order_time)=YEAR(CURDATE())
    GROUP BY sale_date
    ORDER BY sale_date;
  `;

    // Query for most sold items
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
    -- WHERE T.table_number = ?
    WHERE YEAR(O.order_time)=YEAR(CURDATE())
    GROUP BY MI.item_id
    ORDER BY total_quantity_sold DESC
    LIMIT 10;
  `;

    // Query for most sold orders 
    const mostSoldOrdersQuery = `
    SELECT
        O.order_id,
        T.table_number,
        SUM(MI.price * OI.quantity) AS total_order_sales
    FROM Orders AS O
    JOIN OrderItems AS OI ON O.order_id = OI.order_id
    JOIN MenuItems AS MI ON OI.item_id = MI.item_id
    JOIN Tables AS T ON O.table_id = T.table_id
    -- WHERE T.table_number = ?
    WHERE YEAR(O.order_time)=YEAR(CURDATE())
    GROUP BY O.order_id
    ORDER BY total_order_sales DESC
    LIMIT 10;
  `;
    // Query for most ordered table 
    const mostOrderedTable = `SELECT
                T.table_number,
                SUM(MI.price * OI.quantity) AS total_order_sales
                FROM Orders AS O
                JOIN OrderItems AS OI ON O.order_id = OI.order_id
                JOIN Tables AS T ON O.table_id = T.table_id
                JOIN MenuItems AS MI ON OI.item_id = MI.item_id
                WHERE YEAR(O.order_time)=YEAR(CURDATE())
                GROUP BY T.table_number
                ORDER BY total_order_sales DESC
                LIMIT 5`;
    ;

    connection.query(dailySalesQuery, (err, dailySalesResult) => {
      if (err) {
        console.error(err);
        return res.status(500).send("An error occurred while fetching daily sales data");
      }

      connection.query(mostSoldItemsQuery, (err, mostSoldItemsResult) => {
        if (err) {
          console.error(err);
          return res.status(500).send("An error occurred while fetching most sold items");
        }

        connection.query(mostSoldOrdersQuery, (err, mostSoldOrdersResult) => {
          if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while fetching most sold orders");
          }
          connection.query(mostOrderedTable, (err, mostOrderedTableResult) => {
            if (err) {
              console.error(err);
              return res.status(500).send("An error occurred while fetching most sold orders on table");
            }
            const response = {
              dailySales: dailySalesResult,
              mostSoldItems: mostSoldItemsResult,
              mostSoldOrders: mostSoldOrdersResult,
              mostOrderedTable: mostOrderedTableResult
            };

            res.json(response);
          })

        });
      });
    });
  }
  else {
    res.status(500).send("SEND VALID REQUEST");
  }

});
