const { StatusCodes } = require("http-status-codes");
const { User } = require("../models/user");

exports.getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  res.status(StatusCodes.OK).send({
    user,
  });
};

exports.getUsers = async (req, res) => {
  const users = await User.findAll();

  res.status(StatusCodes.OK).send({
    users,
  });
};

exports.createUser = async (req, res) => {
  const body = req.body;

  const user = await User.create(body);

  res.status(StatusCodes.CREATED).send({
    user,
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  await User.destroy({
    where: {
      id,
    },
  });

  res.status(StatusCodes.NO_CONTENT).send();
};
