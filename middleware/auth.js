const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const { userId } = decodedToken;
    if (req.body.userId && req.body.userId !== userId) {
      throw new Error('User Id is not valid');
    } else {
      next();
    }
  } catch (error) {
    res
      .status(401)
      .json({ error: error || 'Request without authentification' });
  }
};
