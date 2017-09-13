const express = require("express");
const path = require("path");
// const favicon = require('serve-favicon');
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const connect = require("./mongo");

const index = require("./routes/index");
const users = require("./routes/users");

const app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
const hbs = require("express-handlebars");
app.engine("express-handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "hbs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//CONNECT OUR DB
// Mongoose;
app.use(async (req, res, next) => {
  if (!mongoose.connection.readyState) {
    await connect();
  }
  next();
});

//ROUTES
app.use("/", index);
app.use("/users", users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//CLOSE DB CONNECTION
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState) {
    await mongoose.disconnect();
  }
  next();
});

module.exports = app;