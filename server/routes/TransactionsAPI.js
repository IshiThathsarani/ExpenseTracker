const Router = require('express')
const Transaction = require('../models/transaction');
// const passport = require('passport');


const router = Router();

router.get('/', 
    // passport.authenticate('jwt', {session: false}), //authenticate
    async (req, res)=>{
    const transaction = await Transaction.find({}).sort({createdAt: -1}); //sort to new to old
    res.json({data: transaction});
});

    //post request
router.post('/',async (req, res)=>{
    const {amount, description, date, category} = req.body;
    const transaction = new Transaction({
        amount,
        description,
        date ,
        category   //since the key and variable is same no need to repeat like amount:amount...
    });
    await transaction.save(); //save to db
    res.json({message: "Success"});
});

    //delete request
router.delete('/:id', async (req, res)=>{  //delete by id
    await Transaction.findByIdAndDelete({_id: req.params.id});
    res.json({message: "Successfully Deleted"});
}); 

    //update request [patch]
router.patch('/:id', async (req, res)=>{ //update by id
    await Transaction.findByIdAndUpdate({_id: req.params.id}, req.body); //({_id: req.params.id}, {$set: req.body})
    res.json({message: "Update Successfully"});
});

module.exports = router;