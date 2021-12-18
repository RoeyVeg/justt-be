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
  console.log({ body: req.body });
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
  pool.query("SELECT * from transactions", (err, result) => {
    if (err) {
      console.log({ err });
    }
    // pool.end();
    res.status(200).json(result.rows);
  });
};
module.exports = {
  getTransactions,
  insertTransactions,
};
