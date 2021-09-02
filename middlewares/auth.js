const jwt = require('jsonwebtoken');

module.exports = (roles = []) => {

  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided!');

    try {
      const decoded = jwt.verify(token, 'secret_key')
      req.user = decoded;
      if (roles.length && !roles.includes(req.user.role_name)) {
        return res.status(401).send('Unauthorized.')
      }

      next();
    } catch (err) {
      res.status(400).send('Invalid token.')
    }
  }
}
