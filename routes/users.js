const express = require('express')
const router = express.Router()
const {loginUser , signupUser} = require('../controllers/UserController');


//login route
router.post('/login',loginUser)  // post because we will be sending login data and similar with signup

//signup route
router.post('/signup', signupUser);

module.exports = router