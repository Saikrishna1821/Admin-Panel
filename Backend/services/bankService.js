const { pool } = require("../models/commondb");

class BankService {
  getAllBanks = async () => {
    try {
      let [rows] = await pool.query(`Select * from bankdata`);

      return rows;
    } catch (e) {
      return e;
    }
  };

  addBank = async (data) => {
    try {
      let addBank = await pool.query(
        "Insert INTO bankdata (bankname,country) values (?,?)",
        data
      );

      return addBank;
    } catch (err) {
      return err;
    }
  };
}

module.exports = new BankService();
