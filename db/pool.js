const { Pool } = require("pg");

const platforms = new Pool({
	host: process.env.HOST,
	user: process.env.USER,
	database: process.env.PLATFORMDB,
	password: process.env.DBPASSWORD,
	port: process.env.DBPORT,
});

const games = new Pool({
	host: process.env.HOST,
	user: process.env.USER,
	database: process.env.GAMEDB,
	password: process.env.DBPASSWORD,
	port: process.env.DBPORT,
});

module.exports = { platforms, games };
