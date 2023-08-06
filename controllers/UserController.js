const usermodel = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken =(_id)=>{
  return jwt.sign({_id},process.env.SECRET,{expiresIn: '2d'}) // payload secretKey and option repectivily are added 
}
//login
const loginUser = async (req, res) => {
  const {email , password } = req.body;
  try {
    const user = await usermodel.login(email,password)
    //create token
    const token = createToken(user._id)
    res.status(200).json({email,token})
  } catch (error) {
    res.status(400).json({error: error.message}) // catch the thrown error in userModel.js/signup method error
  }
};

///signup
const signupUser = async (req, res) => {
  const {email , password } = req.body;
  try {
    const user = await usermodel.signup(email,password)
    //create token
    const token = createToken(user._id)
    res.status(200).json({email,token})
  } catch (error) {
    res.status(400).json({error: error.message}) // catch the thrown error in userModel.js/signup method error
  }
};

module.exports = { loginUser, signupUser }; 
