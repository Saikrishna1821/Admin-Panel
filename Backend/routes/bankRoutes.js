const express=require('express')
const bank=require('../controllers/bankController');
const router=express.Router();

router.get('/getAllBanks',bank.getAllBanks);
router.post('/addbank',bank.addNewBank);

module.exports=router;