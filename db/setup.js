const { Room } = require("../models");
const { Timeslot } = require("../models");
const { User } = require("../models");

const setupTimeslot = async () => {
  const timeslotCount = await Timeslot.count();
  if (timeslotCount === 0) {
    const availableSlots = new Array(10)
      .fill(0)
      .map((_, index) => ({ time: `${index + 8}:00-${index + 9}:00` }));
    await Timeslot.bulkCreate(availableSlots);
  }
};

const setupRoom = async () => {
  const roomCount = await Room.count();
  if (roomCount === 0) {
    await Room.bulkCreate([
      { name: "Discussion Room 1" },
      { name: "Conference Room" },
      {
        name: "Discussion Room2",
      },
    ]);
  }
};

const setupTestAccount = async () => {
  const userCount = await User.count();
  if (userCount === 0) {
    await User.create({
      name: "test",
      password: "password123",
    });
    console.log("user created");
  }
};

const setup = async () => {
  console.log("setting up database");
  await setupTimeslot();
  await setupRoom();
  await setupTestAccount();
  console.log("finished setting up");
};

module.exports.setup = setup;
