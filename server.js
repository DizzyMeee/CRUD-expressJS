const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 8080;

// log requests to the console
app.use(morgan("tiny"));

const start = async () => {
  // mongodb connection
  await connectDB();

  app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
  });
};

start();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"));

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use("/", require("./server/routes/router"));

// catch 404 page
app.use(function (req, res, next) {
  res.status(404).render("404");
});
