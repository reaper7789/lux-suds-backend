const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401); // No token provided

  try {
    const user = jwt.verify(token, SECRET); // Validate token
    req.user = user; // Attach decoded user to request
    next(); // Proceed to route
  } catch {
    res.sendStatus(403); // Invalid token
  }
}

module.exports = authMiddleware;
