const express = require('express')
const router = express.Router();

// constroller functions
const {loginUser, signupUser} = require('../controllers/userController')

// login route
router.post("/login", loginUser)


// signup router
router.post("/signup", signupUser)


module.exports = router;