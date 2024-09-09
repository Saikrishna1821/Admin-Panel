const { pool } = require("../models/commondb");

class CreditCardService {
  allCardDetails = async () => {
    try {
      let [rows] = await pool.query(
        `select * from creditcard order by createdAt desc`
      );
      return rows;
    } catch (err) {
      throw err;
    }
  };

  addNewCard = async (data) => {
    try {
      let [rows] = await pool.query(
        `INSERT INTO creditcard (cardname,bankname,enabled) VALUES (?,?,?)`,
        data
      );
      return rows;
    } catch (err) {
      throw err;
    }
  };

  editCard = async (data, id) => {
    try {
      let result = await pool.query(
        `update creditcard set cardname='${data.cardname}', bankname='${data.bankname}', enabled=${data.enabled} where id=${id}`
      );
      return result;
    } catch (err) {
      throw err;
    }
  };
  deleteCard = async (id) => {
    try {
      let result = await pool.query(`delete from creditcard  where id=${id}`);
      return result;
    } catch (err) {
      throw err;
    }
  };
}

module.exports = new CreditCardService();
