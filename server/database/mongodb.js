const mongoose = require('mongoose');

function connect() {  //async at the begining if want
const mongodbURL = 
    // "mongodb+srv://ishini:ishini99@expense.x76dkjf.mongodb.net/?retryWrites=true&w=majority"
    "mongodb+srv://ishini:ishini99@expenses.bpeiquc.mongodb.net/?retryWrites=true&w=majority"
    

mongoose.connect( //if async is there this should be await in the begining
    mongodbURL
)
console.log("Mongodb connected successfully")
}

exports = module.exports = connect;
