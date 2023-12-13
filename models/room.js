const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/init");

const Room = sequelize.define(
  "Room",
  {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

exports.Room = Room;
