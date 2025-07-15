const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const createToken = (payload) => {
  const token = jwt.sign(payload, jwtSecret);
  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, jwtSecret);
  return payload;
};

const tokenUtils = { createToken, verifyToken };
module.exports = tokenUtils;