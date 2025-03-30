const pool= require("./pool.js");

async function getAll(platform = "") {
    const gameValues = await getGames(platform);
    const platformValues = await getPlatforms();
    return [gameValues, platformValues];
}

async function getGames(platform) {
    let query = "SELECT games.name AS game, platforms.name AS platform, completion_status, notes, date_added FROM games" + 
    (platform ? " WHERE platform ILIKE $1" : "") +
    " JOIN platforms ON platforms.id = games.platform_id ORDER BY platform";
    let values = [];
    
    if (platform) values.push(`%${platform}%`);

    const { rows } = await pool.query(query, values);
    return rows;
}

async function getPlatforms() {
    let query = "SELECT name FROM platforms";
    const { rows } = await pool.query(query);
    return rows;
}

async function addGame() {

}

async function addPlatform() {

}

async function deleteGame() {

}

async function deletePlatform() {

}

async function updateGame() {

}

async function updatePlatform() {

}

module.exports = { getAll, addGame, addPlatform, deleteGame, deletePlatform, updateGame, updatePlatform };