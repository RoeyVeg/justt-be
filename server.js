const express = require("express");
let router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializaDB } = require("./db/db");
const app = express();
const port = 8080;

const transactions = require("./transactions/transactions");
const { pool } = require("./db/db");
const trans = require("./data/data");

app.use(bodyParser.json());
app.use(cors());
// initializaDB();

// router.get("/transactions", transactions.getTransactions);
app.get("/transactions", async (req, res) => {
  await pool.query("SELECT * from transactions", (err, result) => {
    if (err) {
      console.log({ err });
    }
    pool.end();
    return res.status(200).json(result.rows);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
