const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token)
    return res.status(401).json({ error: 'Access Denied. No token provided.' });

  try {
    const verified = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET
    );
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid Token' });
  }
};
