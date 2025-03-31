const db = require("../db/queries.js");
const { body, validationResult } = require("express-validator");

exports.getIndex = async function (req, res) {
	res.render("index");
};

exports.getView = async function (req, res) {
	const search = req.query.search || "";
	const values = await db.getAll(search);
	res.render("view", {
		games: values[0],
		platforms: values[1],
		search: search,
	});
};

const validateGame = [
	body("name")
		.trim()
		.isLength({ min: 1, max: 50 })
		.withMessage("Name must be 1 to 50 characters long"),
	body("notes")
		.trim()
		.isLength({ min: 1, max: 50 })
		.withMessage("Notes must be 1 to 50 characters long"),
];

exports.getAddGame = async function (req, res) {
	const platformList = await db.getPlatforms();
	res.render("addGame", { platforms: platformList });
};

exports.postAddGame = [
	validateGame,
	async function (req, res) {
		const errors = validationResult(req);
        const platformList = await db.getPlatforms();
        if (!errors.isEmpty()) {
            return res.status(400).render("addGame", { platforms: platformList, errors: errors.array() });
        }
        const { name, platform, completion_status, notes } = req.body;
        await db.addGame(name, platform, completion_status, notes);
        res.redirect("view");
	},
];
