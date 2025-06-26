const express = require("express");
const app = express();
app.use(express.json());
const { Sequelize, Model, DataTypes } = require("sequelize");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes.js");
const roomRoutes = require("./routes/roomRoutes.js");
const bookingRoutes = require("./routes/bookingRoutes.js");

app.use(userRoutes);
app.use(roomRoutes);
app.use(bookingRoutes);

app.listen(3000, () => {
  console.log("El servidor esta corriendo en el puerto 3000");
});
