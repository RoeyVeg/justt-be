const express = require("express");
let router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializaDB } = require("./db/db");
const app = express();
const port = 8080;

const transactions = require("./transactions/transactions");
// const { pool } = require("./db/db");
// const trans = require("./data/data");

app.use(bodyParser.json());
app.use(cors());

app.get("/transactions", transactions.getTransactions);
app.post("/transaction", transactions.insertTransactions);
app.delete("/transactions/:id", transactions.deleteTransaction);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
