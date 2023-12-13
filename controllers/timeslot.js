const { StatusCodes } = require("http-status-codes");
const { Timeslot } = require("../models/timeslot");
const { Booking } = require("../models/booking");
const { Op } = require("sequelize");

exports.getAvailabelTimeslot = async (req, res) => {
  const { RoomId, date } = req.query;

  const timeslots = await Timeslot.findAll({
    include: [
      {
        model: Booking,
        required: true,
        where: {
          RoomId,
          date,
        },
        attributes: ["id"],
      },
    ],
    attributes: ["id"],
  });

  const availableTimeslots = await Timeslot.findAll({
    where: {
      id: {
        [Op.notIn]: timeslots.map((timeslot) => timeslot.id),
      },
    },
  });

  res.status(StatusCodes.OK).send({
    timeslots: availableTimeslots,
  });
};
