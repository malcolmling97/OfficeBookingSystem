const { Router } = require("express");
const {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  getRooms,
} = require("../controllers");
const router = Router();

router.route("/:userId/booking").get(async (req, res) => {
  const rooms = await getRooms();
  res.render("booking", {
    rooms,
  });
});

router.route("/:id").get(getUser).delete(deleteUser);

router.route("/").get(getUsers).post(createUser);

module.exports = router;
