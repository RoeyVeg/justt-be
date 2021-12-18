const trans = require("../data/data");
const { pool } = require("../db/db");

const getTransactions = async (req, res) => {
  try {
    const result = await pool.query("SELECT * from transactions");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log({ error });
    res.status(400).json({ error: err });
  }
};

const deleteTransaction = async (req, res) => {
  const query = `DELETE FROM transactions WHERE customer_id = $1`;
  try {
    const result = await pool.query(query, [req.params.id]);
    console.log("sucess deleting transaction");
    res.status(200).json(result);
  } catch (error) {
    console.log({ err });
    res.status(400).json({ error: err });
  }
};

const insertTransactions = async (req, res) => {
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
  try {
    await pool.query(query, [...Object.values(req.body)]);
    console.log("sucess adding transaction");
    res.status(200).send(`transaction added`);
  } catch (error) {
    console.log({ err });
    res.status(400).json({ error: err });
  }
};
const updateTransaction = async (req, res) => {
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
  try {
    await pool.query(query, [...Object.values(req.body)]);
    console.log("sucess update transaction");
    res.status(200).send(`transaction updated`);
  } catch (error) {
    console.log({ err });
    res.status(400).json({ error: err });
  }
};
module.exports = {
  getTransactions,
  insertTransactions,
  deleteTransaction,
  updateTransaction,
};
