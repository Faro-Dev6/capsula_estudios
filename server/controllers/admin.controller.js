import { transactions } from "../data/store.js";

export const getTransactions = (req, res) => {
  res.json({
    transactions
  });
};