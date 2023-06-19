const Router = require('express')
const User = require('../models/user');
const bcrypt = require('bcrypt');

const router = Router();

router.post('/register', async (req, res)=>{  //new user
    
    //get all the data from the form
    const {email,password,firstName,lastName} = req.body;
    console.log(req.body);
    //check if the user already exists
    const userExists = await User.findOne({email: email});
    if(userExists){
        res.status(406).json({message: "User already exists"});
        return;
    }
        //if the user does not exist, create a new user
    //hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    console.log(hashedPassword)

    const user = await User({email,password: hashedPassword,firstName,lastName}); //create a new user
    const savedUser = user.save()
    console.log(savedUser);

    //save the user to the database
    
    res.status(201).json({message: "Successfully Registered"});
})


module.exports = router;