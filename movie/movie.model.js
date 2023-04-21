const { Database } = require("../classes/Database");

function getAll() {
  try {
    const database = new Database();
    const sql = `SELECT m.id, u.username as owner, m.title, m.year, m.published as public FROM users u INNER JOIN movies m
    ON m.owner = u.id ORDER BY m.title`;
    return database.queryClose(sql);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function remove(id, user) {
  try {
    const database = new Database();
    const sql = `DELETE FROM movies WHERE id='${id}' AND owner=(SELECT id FROM users WHERE username='${user}')`;
    const result = await database.queryClose(sql);
    if (result.affectedRows != 1) {
      return Promise.reject("Deleteerror");
    }
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
}

function get(id) {
  try {
    const database = new Database();
    const sql = `SELECT m.id, u.username as owner, m.title, m.year, m.published as public FROM users u INNER JOIN movies m
    ON m.owner = u.id WHERE m.id='${id}'`;
    return database.queryClose(sql);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function save(movie) {
  try {
    const database = new Database();
    let result = "";
    if (movie.id === "-1") {
      let sql = `SELECT * FROM movies WHERE title='${movie.title}'`;
      result = await database.query(sql);
      if (result.length > 0) {
        return Promise.reject("Movie already exists");
      }
      sql = `INSERT INTO movies (title, year, published, owner) VALUES ('${movie.title}','${
        movie.year
      }','${movie.public ? 1 : 0}',(SELECT id FROM users WHERE username='${movie.owner}'))`;
      result = await database.queryClose(sql);
      if (result.affectedRows != 1) {
        return Promise.reject("Error while saving Movie");
      } else {
        return Promise.resolve("Movie inserted");
      }
    } else {
      let sql = `SELECT * FROM movies WHERE title='${movie.title}' AND id!='${movie.id}'`;
      result = await database.query(sql);
      if (result.length > 0) {
        return Promise.reject("Movie already exists");
      }
      sql = `UPDATE movies SET title='${movie.title}', year='${movie.year}', published='${
        movie.public ? 1 : 0
      }' WHERE id='${movie.id}'`;
      result = await database.queryClose(sql);
      if (result.affectedRows != 1) {
        return Promise.reject("Error while saving Movie");
      } else {
        return Promise.resolve("Movie inserted");
      }
    }
  } catch (error) {
    return Promise.reject("Database error");
  }
}

async function saveImports(file, username) {
  try {
    if (!file) {
      return Promise.resolve("No file uploaded");
    }
    if (!username) {
      return Promise.reject();
    }
    const database = new Database();
    let sql = `START TRANSACTION`;
    let result = "";
    await database.query(sql);
    const movies = JSON.parse(file.data.toString("ascii"));
    for (let m of movies) {
      if (!m.title || !m.year || Object.keys(m).length != 2) {
        return Promise.resolve("Wrong JSON-Format");
      } else {
        let sql = `SELECT * FROM movies WHERE title='${m.title}'`;
        result = await database.query(sql);
        if (result.length > 0) {
          sql = `ROLLBACK`;
          await database.queryClose(sql);
          return Promise.resolve(`Film ${m.title} already exists`);
        }
        sql = `INSERT INTO movies (title, year, published, owner) VALUES ('${m.title}','${
          m.year
        }','${0}',(SELECT id FROM users WHERE username='${username}'))`;
        result = await database.query(sql);
        if (result.affectedRows != 1) {
          sql = `ROLLBACK`;
          await database.queryClose(sql);
          return Promise.reject("Database error");
        }
      }
    }
    sql = `COMMIT`;
    await database.queryClose(sql);
    return Promise.resolve("Movies imported");
  } catch (error) {
    try {
      sql = `ROLLBACK`;
      await database.queryClose(sql);
    } catch (err) {}
    return Promise.resolve("Wrong JSON-Format");
  }
}

module.exports = { getAll, remove, get, save, saveImports };
