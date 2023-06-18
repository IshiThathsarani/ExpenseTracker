const Router = require('express')
const Transaction = require('../models/transaction');


const router = Router();

router.get('/', async (req, res)=>{
    const transaction = await Transaction.find({}).sort({createdAt: -1}); //sort to new to old
    res.json({data: transaction});
});

    //post request
router.post('/',async (req, res)=>{
    const {amount, description, date} = req.body;
    const transaction = new Transaction({
        amount,
        description,
        date   //since the key and variable is same no need to repeat like amount:amount...
    });
    await transaction.save(); //save to db
    res.json({message: "Success"});
});

    //delete request
router.delete('/:id', async (req, res)=>{  //delete by id
    await Transaction.findByIdAndDelete({_id: req.params.id});
    res.json({message: "Success"});
}); 

module.exports = router;