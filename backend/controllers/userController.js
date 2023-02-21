const User = require('../models/User')
const bcrypt = require('bcrypt')

// login user

const loginUser = async (req, res) => {
    res.status(200).json({msg:'login user'})
}


// signup user
const signupUser = async (req, res) => {

    const {email, password} = req.body

    // check if user already exists
    const registered = await User.findOne({email}).count();

    if(registered){
        return res.status(400).json({msg:'This email is already registered.'})
        
    }

    // hash password and save to db if user has not yet registered
    const hashedPass = await bcrypt.hash(password, 10)


    try{

        const newUser = await User.create({email, password: hashedPass})
        res.status(200).json({action: 'register', user: newUser})

    }catch(err){

        res.status(400).json({msg:'Sign up failed', err})
    }

}

module.exports = {loginUser, signupUser}