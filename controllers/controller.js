const db = require("../db/queries.js");
const { body, validationResult } = require("express-validator");

exports.getIndex = async function (req, res) {
    res.render("index");
}

exports.getView = async function (req, res) {
    const filter = req.query.platform || "";
    const values = await db.getAll(filter);
    res.render("view", { games: values[0], platforms: values[1], filter: filter});
}

