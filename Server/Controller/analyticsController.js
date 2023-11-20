// analyticsController.js
const AnalyticsModel = require('./analyticsModel');

class AnalyticsController {
  static getAnalytics(data, res) {
    if (data === 'All' || data === 'all') {
      AnalyticsModel.getDailySales((err, dailySalesResult) => {
        if (err) {
          console.error(err);
          return res.status(500).send("An error occurred while fetching daily sales data");
        }

        AnalyticsModel.getMostSoldItems((err, mostSoldItemsResult) => {
          if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while fetching most sold items");
          }

          AnalyticsModel.getMostSoldOrders((err, mostSoldOrdersResult) => {
            if (err) {
              console.error(err);
              return res.status(500).send("An error occurred while fetching most sold orders");
            }

            AnalyticsModel.getMostOrderedTable((err, mostOrderedTableResult) => {
              if (err) {
                console.error(err);
                return res.status(500).send("An error occurred while fetching most sold orders on table");
              }

              AnalyticsModel.getTotalSales((err, totalSalesResult) => {
                if (err) {
                  console.error(err);
                  return res.status(500).send("An error occurred while fetching total sales");
                }

                AnalyticsModel.getAvgStars((err, avgStarsResult) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).send("An error occurred while fetching reviews");
                  }

                  AnalyticsModel.getCountByStars((err, countResult) => {
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
                      Avearage: avgStarsResult,
                      starsCount: countResult
                    };

                    res.json(response);
                  });
                });
              });
            });
          });
        });
      });
    } else if (data === 'daily' || data === 'Daily') {
      // Similar logic for daily analytics...
    } else if (data === 'weekly' || data === 'Weekly') {
      // Similar logic for weekly analytics...
    } else if (data === 'monthly' || data === 'Monthly') {
      // Similar logic for monthly analytics...
    } else {
      res.status(500).send("SEND VALID REQUEST");
    }
  }
}

module.exports = AnalyticsController;
