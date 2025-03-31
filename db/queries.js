const pool = require("./pool.js");

async function getAll(search = "") {
	const gameValues = await getGames(search);
	const platformValues = await getPlatforms();
	return [gameValues, platformValues];
}

async function getGames(search = "") {
	let query =
		"SELECT games.name AS game, platforms.name AS platform, completion_status, notes, date_added FROM games" +
        " JOIN platforms ON platforms.id = games.platform_id" +
		(search ? " WHERE games.name ILIKE $1" : "") +
		" ORDER BY platform";
	let values = [];

	if (search) values.push(`%${search}%`);

	const { rows } = await pool.query(query, values);
	return rows;
}

async function getPlatforms() {
	let query = "SELECT name FROM platforms";
	const { rows } = await pool.query(query);
	return rows;
}

async function addGame(name, platform, completion_status, notes) {
	await pool.query(
		"INSERT INTO games (name, platform_id, completion_status, notes) " +
			"VALUES ($1, (SELECT id FROM platforms WHERE platforms.name LIKE $2), $3, $4)",
		[name, platform, completion_status, notes]
	);
}

async function addPlatform() {}

async function deleteGame() {}

async function deletePlatform() {}

async function updateGame() {}

async function updatePlatform() {}

module.exports = {
	getAll,
    getGames,
    getPlatforms,
	addGame,
	addPlatform,
	deleteGame,
	deletePlatform,
	updateGame,
	updatePlatform,
};
