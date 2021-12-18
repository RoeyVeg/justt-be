const trans = require("../data/data");
const { pool } = require("../db/db");

const getTransactions = (req, res) => {
  pool.query("SELECT * from transactions", (err, result) => {
    if (err) {
      console.log({ err });
      res.status(400).json({ error: err });
    }
    res.status(200).json(result.rows);
  });
};

const deleteTransaction = (req, res) => {
  const query = `DELETE FROM transactions WHERE customer_id = $1`;
  pool.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.log({ err });
      res.status(400).json({ error: err });
    }
    console.log("sucess deleting transaction");
    res.status(200).json(result);
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
      res.status(400).json({ error: err });
    }
    console.log("sucess adding transaction");
    res.status(200).send(`transaction added`);
  });
};
const updateTransaction = (req, res) => {
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
  const query = `UPDATE transactions SET 
  first_name = $2, last_name = $3, email = $4, total_price = $5, currency = $6, cerdit_card_type = $7, cerdit_card_number = $8
  WHERE customer_id = $1
  `;
  pool.query(query, [...Object.values(req.body)], (err, result) => {
    if (err) {
      console.log({ err });
      res.status(400).json({ error: err });
    }
    console.log("sucess update transaction");
    res.status(200).send(`transaction updated`);
  });
};
module.exports = {
  getTransactions,
  insertTransactions,
  deleteTransaction,
  updateTransaction,
};
