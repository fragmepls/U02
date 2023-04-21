const { Database } = require("../classes/Database");

async function get(username) {
  try {
    const database = new Database();
    const sql = `SELECT id, username, passwordhash as password, firstname, secondname as lastname FROM users WHERE username='${username}'`;
    return await database.queryClose(sql);
  } catch (error) {
    throw error;
  }
}

module.exports = { get };
