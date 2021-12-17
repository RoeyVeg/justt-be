const trans = require("../data/data");

const getTransactions = (req, res) => {
  console.log({ res });
  return res.status(200).json(trans);
};

module.exports = {
  getTransactions,
};
