const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const bearerToken = req.headers['Authorization']
  console.log('bearer Token : ', bearerToken)
}