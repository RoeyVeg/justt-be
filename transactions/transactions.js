const trans = require("../data/data");
const { pool } = require("../db/db");

const getTransactions = (req, res) => {
  pool.query("SELECT * from transactions", (err, result) => {
    if (err) {
      console.log({ err });
    }
    // pool.end();
    res.status(200).json(result.rows);
  });
};

const insertTransactions = (req, res) => {
  const {
    custId,
    firstName,
    lastName,
    email,
    totalPrice,
    currency,
    ccType,
    ccNumber,
  } = req.body;
  const query = `INSERT INTO transactions (customer_id, first_name, last_name, email, total_price, currency, cerdit_card_type, cerdit_card_number)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
  `;
  pool.query(query, [...Object.values(req.body)], (err, result) => {
    if (err) {
      console.log({ err });
    }
    console.log("sucess adding transaction");
    res.status(200).send(`transaction added`);
  });
};
module.exports = {
  getTransactions,
  insertTransactions,
};
