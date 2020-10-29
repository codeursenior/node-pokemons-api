const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key')

module.exports = (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, privateKey);

  // TODO : créer le middleware d'authentification 401 !

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, privateKey);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};