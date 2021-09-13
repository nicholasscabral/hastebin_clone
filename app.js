const express = require("express");
const routes = require("./routes");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/wastebin");

module.exports = app;
