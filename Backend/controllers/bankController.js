const BankService =require("../services/bankService");

class BankController{
  
    getAllBanks=async(req,res)=>{

        try{
          let result=await BankService.getAllBanks();
           
          res.json(result);

        }
        catch(e)
        {
            res.json({message:"Something went wrong",status:"Error"});
        }
    }

    addNewBank=async(req,res)=>{

        try{

          let result=await BankService.addBank([req.body.bankname,req.body.country]);
           
          res.json(result);

        }
        catch(e)
        {
            res.json({message:"Something went wrong",status:"Error"});
        }
    }
}

module.exports=new BankController();