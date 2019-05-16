const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
  // Get token from header sent in the request
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) return res.status(401).json({msg: "No token, authorization denied"});

  try {

    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret")); // sends user id

    // Add user from payload
    req.user = decoded; // set to user id
    next(); // sends to the route
  } catch(e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;