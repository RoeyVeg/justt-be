const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializaDB } = require("./db/db");
const app = express();
const port = 8080;

const trans = require("./data/data");

app.use(bodyParser.json());
app.use(cors());
initializaDB();

app.get("/transactions", (req, res) => {
  return res.status(200).json(trans);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
