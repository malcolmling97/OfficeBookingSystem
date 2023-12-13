const userController = require("./user");
const roomController = require("./room");
const bookingController = require("./booking");

module.exports = {
  ...userController,
  ...roomController,
  ...bookingController,
};
