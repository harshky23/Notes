const jwt = require('jsonwebtoken')
const usermodel = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers  // will include word ajnvava.avava.vavavveff (jwt token)

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]  // extracting token from authorization word(0 position) iut3tq7.crtnuc9p.u2g085(1 position in array)

  try {
    const { _id } = jwt.verify(token, process.env.SECRET) // to verify jwt using the secret key

    req.user = await usermodel.findOne({ _id }).select('_id')  // finding by id and extracting only id 
    next() // to move on to next routes 

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth