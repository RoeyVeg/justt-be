const express = require("express");
let router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializaeTable, initDB } = require("./db/db");
const app = express();
const port = 8080;

const transactions = require("./transactions/transactions");

initDB();
// initializaeTable();
app.use(bodyParser.json());
app.use(cors());

app.get("/transactions", transactions.getTransactions);
app.post("/transactions", transactions.insertTransactions);
app.delete("/transactions/:id", transactions.deleteTransaction);
app.put("/transactions", transactions.updateTransaction);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
