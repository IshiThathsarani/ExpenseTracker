const Router = require('express')
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = Router();

router.get('/', async (req, res) => {
    res.json({ user: 'Hello World' });
});



module.exports = router;