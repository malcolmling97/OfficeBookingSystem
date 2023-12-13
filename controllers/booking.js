const { StatusCodes } = require("http-status-codes");
const { Booking } = require("../models/booking");

exports.createBooking = async (req, res) => {
  const body = req.body;

  const booking = await Booking.create(body);

  res.status(StatusCodes.CREATED).send({
    booking,
  });
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.findAll();

  res.status(StatusCodes.OK).send({
    bookings,
  });
};

exports.getBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findByPk(id);

  res.status(StatusCodes.OK).send({
    booking,
  });
};

exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  await Booking.destroy({
    where: {
      id,
    },
  });

  res.status(StatusCodes.NO_CONTENT).send();
};

exports.updateBooking = async (req, res) => {
  const { id } = req.params;

  const body = req.body;

  const booking = await Booking.update(body, {
    where: {
      id,
    },
  });

  res.status(StatusCodes.OK).send({
    booking,
  });
};

exports.getBookingAvailable = async (req, res) => {};
