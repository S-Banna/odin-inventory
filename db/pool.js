const { Pool } = require("pg");

const pool = new Pool({
	host: process.env.HOST,
	user: process.env.USER,
	database: process.env.DB,
	password: process.env.DBPASSWORD,
	port: process.env.DBPORT,
});

module.exports = pool;
