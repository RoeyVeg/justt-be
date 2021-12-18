const { Pool, Client } = require("pg");
// const util = require("util");

const pool = new Pool({
  user: "",
  host: "localhost",
  database: "justtDb",
  password: "",
  port: 5432,
});

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error("Error acquire client");
//   }
//   if (client) {
//     release();
//   }
// });
// console.log({ pool });
// pool.query = util.promisify(pool.query);

const initializaDB = () => {
  pool.query("SELECT * from transactions", (err, res) => {
    console.log({ rows: res.rows });
    pool.end();
  });
};

module.exports = {
  initializaDB,
  pool,
};
