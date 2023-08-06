const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const schema = mongoose.Schema

const userSchema = new schema({
    email:{
        type: String,
        required: true,
        unique: true // same email won't regestor again
    },
    password:{
        type:String,
        require:true
    }
})
//static signup method for resuable
userSchema.statics.signup = async function(email, password) {
    if(!email || !password){
        throw Error('All fields must be filled')  // throw means the whole fuction will return this , it won't go ahead 
    }
    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
      }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not Strong') 
    } 
    const exist = await this.findOne({email});  // usermodel is difined below so using this for now
    if(exist){
        throw Error('Email already in use')
    }
    const salt = await bcrypt.genSalt(10) //10 number of rounds to generate a hash 
    const hash = await bcrypt.hash(password, salt) // to combine salt value to password to get hash value
    const user = await this.create({email , password: hash})
    return user;
}  

//static login 
userSchema.statics.login = async function(email,password) {
    if(!email || !password){
        throw error('Fill up all the details')
    }
    const exist = await this.findOne({email});  // usermodel is difined below so using this for now
    if(!exist){  //exist mai sab kuch aaraha hai id, emai,password
        throw Error('Incorrect Email')
    }
    const match =  await bcrypt.compare(password , exist.password) // campare password

    if(!match){
        throw Error('Incorrect Password')
    }
    return exist
}
module.exports = mongoose.model('usermodel' ,userSchema);