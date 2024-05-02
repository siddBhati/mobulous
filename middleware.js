const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports.isLoggedIn = (req, res, next) => {
  const token = req.headers['authorization'] || req.query.token || req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
 let user =  jwt.verify(token, process.env.JWT_SECRET)
    if (!user) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    } else {
      next();
      req.decoded = user.user
    };
};

module.exports.isAuthorized = (req, res, next) => {
    const token = req.headers['authorization'] || req.query.token || req.body.token;
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    let user = jwt.verify(token, process.env.JWT_SECRET)
      if (!user) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      } else {
        console.log('middleware', user.user.role);
        if (user.user.role && user.user.role=== 'admin') {
          next();
        } else {
          return res.status(403).json({ message: 'Unauthorized: Not an admin' });
        }
      };
  };

