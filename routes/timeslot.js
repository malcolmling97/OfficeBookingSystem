const { Router } = require("express");
const { getRooms, createRoom, getRoom, deleteRoom } = require("../controllers");
const { getAvailabelTimeslot } = require("../controllers/timeslot");

const router = Router();

router.route("/available").get(getAvailabelTimeslot);

module.exports = router;
