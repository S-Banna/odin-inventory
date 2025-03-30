const { Client } = require("pg");
require('dotenv').config();

const PlatformSQL = `
CREATE TABLE IF NOT EXISTS platforms (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL UNIQUE
);

INSERT INTO platforms (name) 
VALUES
  ('Steam'),
  ('Epic Games'),
  ('PlayStation'),
  ('Xbox'),
  ('Switch'),
  ('Mobile'),
  ('Standalone')
ON CONFLICT (name) DO NOTHING;
`;

const GameSQL = `
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL UNIQUE,
  platform_id INTEGER REFERENCES platforms(id) ON DELETE CASCADE,
  completion_status VARCHAR ( 50 ) DEFAULT 'Unplayed',
  notes TEXT DEFAULT 'No Notes',
  date_added TIMESTAMP DEFAULT NOW() 
);

INSERT INTO games (name, platform_id, completion_status, notes) 
VALUES
  ('Outer Wilds', (SELECT id FROM platforms WHERE name='Steam'), 'Beaten', 'Good Game'),
  ('Rocket League', (SELECT id FROM platforms WHERE name='Epic Games'), 'Invalid', 'Car Soccer'),
  ('Albion Online', (SELECT id FROM platforms WHERE name='Standalone'), 'Invalid', 'some random notes'),
  ('GTA V', (SELECT id FROM platforms WHERE name='Steam'), '100%', DEFAULT),
  ('Mario Kart 8 Deluxe', (SELECT id FROM platforms WHERE name='Switch'), 'Beaten', DEFAULT)
  ON CONFLICT (name) DO NOTHING;
`;

async function mainPlatformPopulator() {
    console.log("seeding...");
	const client = new Client({
		connectionString:
			`postgresql://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.HOST}:${process.env.DBPORT}/${process.env.DB}`,
	});
	await client.connect();
	await client.query(PlatformSQL);
	await client.end();
	console.log("done");
}

async function mainGamePopulator() {
	console.log("seeding...");
	const client = new Client({
		connectionString:
			`postgresql://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.HOST}:${process.env.DBPORT}/${process.env.DB}`,
	});
	await client.connect();
	await client.query(GameSQL);
	await client.end();
	console.log("done");
}

async function runSeeders() {
    await mainPlatformPopulator();
    await mainGamePopulator();
}

runSeeders();
