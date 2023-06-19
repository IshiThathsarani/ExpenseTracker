const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {type: String, required: ['First Name is required']},
    lastName: {type: String, required: ['Last Name is required']},
    email: {type: String, required: ['Email is required']},
    password: {type: String, required: ['Password is required']},   
},
{timestamps: true} //automatically creates fields for when the user was created and when it was updated
);

module.exports = mongoose.model('User', userSchema);
