const { Pool, Client } = require("pg");
const util = require("util");

const pool = new Pool({
  user: "",
  host: "localhost",
  database: "justtDb",
  password: "",
  port: 5432,
});

// pool.query = util.promisify(pool.query);

const initializaeTable = async () => {
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
      const insertQuery = `INSERT INTO transactions VALUES (
            '387-63-2772',
                'Ellwood',
                'Speirs',
                'espeirs1@mediafire.com',
                '4257.95',
                'IDR',
                'visa-electron',
                '4508672811329403'
            )`;
      await pool.query(insertQuery);
    }
  } catch (error) {
    console.log({ error });
  }
};

module.exports = {
  initializaeTable,
  pool,
};
