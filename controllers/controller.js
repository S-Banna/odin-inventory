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
		.isLength({ min: 0, max: 50 })
		.withMessage("Notes must be 0 to 50 characters long")
		.optional({ nullable: true }),
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
			return res
				.status(400)
				.render("addGame", { platforms: platformList, errors: errors.array() });
		}
		const { name, platform, completion_status, notes } = req.body;
		await db.addGame(name, platform, completion_status, notes);
		res.redirect("view");
	},
];

const validatePlatform = [
	body("name")
		.trim()
		.isLength({ min: 1, max: 50 })
		.withMessage("Name must be 1 to 50 characters long"),
	body("password")
		.equals(process.env.PLATFORMDBPASSWORD)
		.withMessage("Password is incorrect."),
];

exports.getAddPlatform = async function (req, res) {
	res.render("addPlatform");
};

exports.postAddPlatform = [
	validatePlatform,
	async function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render("addPlatform", { errors: errors.array() });
		}
		const { name } = req.body;
		await db.addPlatform(name);
		res.redirect("view");
	},
];

exports.getDeleteGame = async function (req, res) {
	const games = await db.getGames();
	res.render("deleteGame", { games: games });
}

exports.postDeleteGame = async function (req, res) {
	const { name } = req.body;
	await db.deleteGame(name);
	res.redirect("view");
}

const validatePlatformDelete = [
	body("password")
		.equals(process.env.PLATFORMDBPASSWORD)
		.withMessage("Password is incorrect."),
];

exports.getDeletePlatform = async function (req, res) {
	const platformList = await db.getPlatforms();
	res.render("deletePlatform", { platforms: platformList });
}

exports.postDeletePlatform = [
	validatePlatformDelete,
	async function (req, res) {
		const errors = validationResult(req);
		const platformList = await db.getPlatforms();
		if (!errors.isEmpty()) {
			return res.status(400).render("deletePlatform", { platforms: platformList, errors: errors.array() });
		}
		const { name } = req.body;
		await db.deletePlatform(name);
		res.redirect("view");
	}
]

exports.getUpdateGame = async function (req, res) {
	const platformList = await db.getPlatforms();
	const gamesList = await db.getGames();
	res.render("updateGame", { games: gamesList, platforms: platformList });
}

exports.postUpdateGame = [
	validateGame,
	async function (req, res) {
		const errors = validationResult(req);
		const platformList = await db.getPlatforms();
		const gamesList = await db.getGames();
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.render("updateGame", { games: gamesList, platforms: platformList, errors: errors.array() });
		}
		const { toBeUpdated, name, platform, completion_status, notes } = req.body;
		await db.updateGame(toBeUpdated, name, platform, completion_status, notes);
		res.redirect("view");
	},
];

exports.getUpdatePlatform = async function (req, res) {
	const platformList = await db.getPlatforms();
	res.render("updatePlatform", { platforms: platformList });
};

exports.postUpdatePlatform = [
	validatePlatform,
	async function (req, res) {
		const errors = validationResult(req);
		const platformList = await db.getPlatforms();
		if (!errors.isEmpty()) {
			return res.status(400).render("updatePlatform", { errors: errors.array(), platforms: platformList });
		}
		const { toBeUpdated, name } = req.body;
		await db.updatePlatform(toBeUpdated, name);
		res.redirect("view");
	},
];
