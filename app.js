const express = require("express");
const { PORT } = require("./constant");
const { connect } = require("./db/connect");
const path = require("path");
const {
  userRouter,
  bookingRouter,
  timeslotRouter,
  authRouter,
} = require("./routes");
const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);
app.use("/bookings", bookingRouter);
app.use("/timeslots", timeslotRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/booking", (req, res) => {
  res.render("booking");
});

app.listen(PORT, async () => {
  console.log("connecting to database");
  await connect();
  console.log("connecting finished");
  console.log(`Server is running on port ${PORT}`);
});
