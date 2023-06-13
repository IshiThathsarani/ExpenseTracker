const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Transaction = require('./models/transaction');

const PORT = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

// connect to mongodb
const mongodbURL = 
    "mongodb+srv://ishini:ishini99@expense.x76dkjf.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(
    mongodbURL
)
console.log("Mongodb connected successfully")

    //get request
app.get('/',(req, res)=>{
    res.send("Hello World");
});
app.get('/transaction', async (req, res)=>{
    const transaction = await Transaction.find({}).sort({createdAt: -1});
    res.json({data: transaction});
});

    //post request
app.post('/transaction',async (req, res)=>{
    const {amount, description, date} = req.body;
    const transaction = new Transaction({
        amount,
        description,
        date   //since the key and variable is same no need to repeat like amount:amount...
    });
    await transaction.save(); //save to db
    res.json({message: "Success"});
});

app.listen(PORT, ()=>{
    console.log("server is running http://localhost:4000");
});