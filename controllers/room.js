const { StatusCodes } = require("http-status-codes");
const { Room } = require("../models/room");

exports.getRooms = async () => {
  const rooms = await Room.findAll();

  return rooms;
};

exports.getRoom = async (req, res) => {
  const { id } = req.params;

  const room = await Room.findByPk(id);

  res.status(StatusCodes.OK).send({
    room,
  });
};

exports.createRoom = async (req, res) => {
  const body = req.body;

  const room = await Room.create(body);

  res.status(StatusCodes.CREATED).send({
    room,
  });
};

exports.deleteRoom = async (req, res) => {
  const { id } = req.params;

  await Room.destroy({
    where: {
      id,
    },
  });

  res.status(StatusCodes.NO_CONTENT).send();
};
