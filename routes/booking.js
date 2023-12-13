const { Router } = require("express");
const {
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
  getBookings,
} = require("../controllers");

const router = Router();

router.route("/").get(getBookings).post(createBooking);

router.route("/:id").get(getBooking).delete(deleteBooking).put(updateBooking);

module.exports = router;
