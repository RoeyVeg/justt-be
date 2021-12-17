const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "",
  host: "localhost",
  database: "justtDb",
  password: "",
  port: 5432,
});

const initializaDB = () => {
  pool.query("SELECT * from transactions", (err, res) => {
    console.log({ rows: res.rows });
    pool.end();
  });
};

module.exports = {
  initializaDB,
};
