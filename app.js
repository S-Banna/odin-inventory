require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const router = require("./routes/routes.js");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/styles"));
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => console.log("Up and running on port: " + PORT));
