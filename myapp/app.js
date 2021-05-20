const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const capacityRouter = require("./routes/capacity");
const bookingRouter = require("./routes/bookings");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/capacity", capacityRouter);
app.use("/booking", bookingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((error, req, res) => {
  if (process.env.NODE_ENV !== "test") {
    console.error({
      error,
      message: error.message || "Some error ocured",
    });
  }

  if (error.status) {
    return res.status(error.status).json({
      type: error.name,
      message: error.message,
      errors: error.errors,
    });
  }
  return res.status(500).json({ message: "Some error ocured" });
});

module.exports = app;
