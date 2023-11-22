// app.js
const express = require("express");
const app = express();
const cors = require('cors');
const port = 8080;
const menuRoutes = require('./routes/menuRoutes');
const managerRoutes = require('./routes/managerRoutes');
const chefRoutes = require('./routes/chefRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes'); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/menu', menuRoutes);
app.use('/manager', managerRoutes);
app.use('/chef', chefRoutes);
app.use('/analytics', analyticsRoutes); 

app.listen(port, () => {
  console.log("listening to the port ", port);
});
