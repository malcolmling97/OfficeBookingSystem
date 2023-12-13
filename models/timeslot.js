const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/init");

const Timeslot = sequelize.define(
  "Timeslot",
  {
    time: DataTypes.STRING,
  },
  { timestamps: false }
);

exports.Timeslot = Timeslot;
