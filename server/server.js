const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connect = require('./database/mongodb'); //mongodb

const TransactionsAPI = require('./routes/TransactionsAPI');
const AuthAPI = require('./routes/AuthAPI');


const PORT = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/transaction', TransactionsAPI);
app.use('/auth', AuthAPI);


connect() // connect to mongodb


    //get request
app.get('/',(req, res)=>{
    res.send("Hello World");
});

app.listen(PORT, ()=>{
    console.log("server is running http://localhost:4000");
});