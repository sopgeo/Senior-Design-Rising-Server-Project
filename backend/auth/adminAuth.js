const jwt = require('jsonwebtoken')
const db = require('../models')
const User = db.users

const adminAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  //console.log(token)
  try {
    const {ucf_id, type} = jwt.verify(token, process.env.SECRET)
    if (type !== 'admin' && type !== 'coordinator') throw Error("User does not privilege")
    if (!ucf_id) throw Error("UCF_ID not found")
    req.user = await User.findOne({
        where: {ucf_id: ucf_id}
    })
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = adminAuth