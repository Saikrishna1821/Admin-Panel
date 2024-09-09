const express=require('express')
const CreditCard=require('../controllers/creditCardController');
const router=express.Router();

router.get('/allCardsDetails',CreditCard.getallCardsDetails);
router.post('/addNewCard',CreditCard.addNewCard);
router.put('/editCard/:id',CreditCard.editCard);
router.delete('/deleteCard/:id',CreditCard.deleteCard)

module.exports=router;