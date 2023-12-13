const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/init");
const { User } = require("./user");
const { Room } = require("./room");
const { Timeslot } = require("./timeslot");

const Booking = sequelize.define("Booking", {
  date: DataTypes.DATEONLY,
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

Timeslot.hasMany(Booking);
User.hasMany(Booking);
Room.hasMany(Booking);

Booking.belongsTo(Timeslot);
Booking.belongsTo(User);
Booking.belongsTo(Room);

module.exports.Booking = Booking;
