const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

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

    //post request
app.post('/transaction',(req, res)=>{
    const {amount, description, date} = req.body;
    res.json({message: "Hello World"});
});

app.listen(PORT, ()=>{
    console.log("server is running http://localhost:4000");
});