const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_SECRET;

// quickly see what this file exports
module.exports = {
  authenticate,
  generateToken
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get("Authorization");
  console.log(token);
  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err){
        res.status(401).json(err);
      }
      else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      error: "No token provided, must be set on the Authorization Header"
    });
  }
}

// Generate Token
function generateToken(user) {
  const { id, username } = user;
  const payload = {
    id: id,
    username: username
  };
  const options = {
    expiresIn: "45m"
  };
  return jwt.sign(payload, jwtKey, options);
}
