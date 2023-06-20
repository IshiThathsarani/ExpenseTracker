const Router = require('express')
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = Router();
const categories =[
    {label: 'Food', icon:'user'},
    {label: 'Shopping', icon:'user'},
    {label: 'Travel', icon:'user'},
    {label: 'Transport', icon:'user'},
    {label: 'Other', icon:'user'},
  ]

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

    const user = await User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        categories
    }); //create a new user
    const savedUser = user.save()
    console.log(savedUser);

    //save the user to the database
    
    res.status(201).json({message: "Successfully Registered"});
});

router.post('/login', async (req, res)=>{ //login
    const {email,password} = req.body;
    const userExists = await User.findOne({email: email});
    if(!userExists){
        res.status(406).json({message: "Credentials are incorrect"});
        return;
    }

    const matched = await bcrypt.compare(password, userExists.password);
    if(!matched){
        res.status(406).json({message: "Credentials are incorrect"});
        return;
    }

    //create jwt token
    const payload = {
        username: userExists.email,
        _id: userExists._id
    }
    const token = jwt.sign({payload},"secret.");
    console.log(token);
    res.status(200).json({message: "Successfully Logged In", token: token});

}) 



module.exports = router;