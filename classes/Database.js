const mysql = require("mysql");

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "movie-db",
    });
  }

  query(sql, params) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }
  queryClose(sql, params) {
    const ret = this.query(sql, params);
    this.close();
    return ret;
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }
}

module.exports = { Database };
