const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const dotenv = require('dotenv');

// Načtěte proměnné z .env souboru
dotenv.config();

// Získání tajného klíče ze .env nebo defaultní hodnoty
const secretKey = process.env.JWT_SECRET || 'TajnyKlicProJWT';

const signToken = (userId) => {
  return jwt.sign({ sub: userId }, secretKey, { expiresIn: '1h' });
};

const verifyToken = expressJwt({ secret: secretKey });

module.exports = { signToken, verifyToken };