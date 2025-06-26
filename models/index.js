const { Sequelize } = require("sequelize");

const sequelizeOptions = {
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  port: process.env.DATABASE_PORT,
};

if (process.env.DATABASE_DIALECT === "postgres") {
  sequelizeOptions.dialectModule = require("pg");
}

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  sequelizeOptions
);

const User = require("./user");
User.initModel(sequelize);
const Room = require("./room");
Room.initModel(sequelize);
const Booking = require("./booking");
Booking.initModel(sequelize);
// Define associations
User.hasMany(Booking, { foreignKey: "userId" });
Room.hasMany(Booking, { foreignKey: "roomId" });
sequelize
  .sync({ alter: true }) // Use 'alter: true' to update the schema without dropping tables
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });

module.exports = {
  sequelize,
  User,
  Room,
  Booking,
};
