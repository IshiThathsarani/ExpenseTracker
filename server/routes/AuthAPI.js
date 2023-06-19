const Router = require('express')

const router = Router();

router.post('/register', async (req, res)=>{  //new user
    
    //get all the data from the form
    //check if the user already exists
    //hash the password
    //save the user to the database
    
    res.json({message: "Successfully Registered"});
})


module.exports = router;