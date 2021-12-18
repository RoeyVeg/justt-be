const { Pool } = require("pg");
const pgtools = require("pgtools");
const { trans } = require("../data/data");

const dbName = "justtDb";

const initDB = async () => {
  console.log("init db");
  try {
    const res = await pgtools.createdb(
      {
        user: "",
        password: "",
        port: 5432,
        host: "localhost",
      },
      dbName
    );
    const pool = new Pool({
      user: "",
      host: "localhost",
      database: dbName,
      password: "",
      port: 5432,
    });
    initializaeTable(pool);
  } catch (error) {
    console.log({ error });
  }
};
const initializaeTable = async (pool) => {
  const createTableQuery = `CREATE TABLE IF NOT EXISTS transactions (
    customer_id VARCHAR ( 255 ),
    first_name VARCHAR ( 255 ),
    last_name VARCHAR ( 255 ),
    email VARCHAR ( 255 ),
    total_price VARCHAR ( 255 ),
    currency VARCHAR ( 255 ),
    cerdit_card_type VARCHAR ( 255 ),
    cerdit_card_number VARCHAR ( 255 )
);`;
  try {
    const result = await pool.query(createTableQuery);
    const transactionsRaw = await pool.query("SELECT * from transactions");
    if (transactionsRaw.rows.length === 0) {
      const valString = trans
        .map((d) => {
          const vals = Object.values(d);
          const valsStr = `(${vals.map((v) => `'${v}'`).join(",")})`;
          return valsStr;
        })
        .join(",");
      const insertQuery = `INSERT INTO transactions VALUES ${valString}`;
      await pool.query(insertQuery);
      pool.end();
    }
  } catch (error) {
    console.log({ error });
  }
};

const pool = new Pool({
  user: "",
  host: "localhost",
  database: dbName,
  password: "",
  port: 5432,
});

module.exports = {
  initializaeTable,
  initDB,
  pool,
};
