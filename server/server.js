const express = require('express');
const mongoose = require('mongoose');

const PORT = 4000;
const app = express();

// connect to mongodb
const mongodbURL = 
"mongodb+srv://ishini:ishini99@expense.x76dkjf.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(
    mongodbURL
)
.then(()=> console.log("Mongodb connected successfully"))
.catch(err => console.log(err));

app.get('/',(req, res)=>{
    res.send("Hello World");
});

app.listen(PORT, ()=>{
    console.log("server is running http://localhost:4000");
});