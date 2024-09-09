const CreditCardService = require("../services/creditCardService");

class CreditCard {
  getallCardsDetails = async (req, res) => {
    let result = await CreditCardService.allCardDetails();
    res.json(result);
  };
  addNewCard = async (req, res) => {
    try {
      let { cardname, bankname, enabled } = req.body;
      let result = await CreditCardService.addNewCard([
        cardname,
        bankname,
        enabled,
      ]);

      res.json({ message: "Successfully added card data" });
    } catch (err) {
      res.json({ message: "Error while inserting" });
    }
  };
  editCard = async (req, res) => {
    try {
      // let {cardname,bankname,enabled}=req.body;
      // console.log(req.body, req.params.id);
      let result = await CreditCardService.editCard(req.body, req.params.id);
      console.log(result);
      res.json({ message: "Successfully added card data" });
    } catch (err) {
      res.json({ message: "Error while updating" });
    }
  };
  deleteCard = async (req, res) => {
    try {
      let result = await CreditCardService.deleteCard(req.params.id);
      res.json({ message: "Successfully deleted card" });
    } catch (err) {
        console.log(err)
      res.json({ message: "Error while deleting" });
    }
  };
}

module.exports = new CreditCard();
