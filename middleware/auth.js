const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ');
    if (req.headers.authorization === undefined) {
      throw new Error('No token provided');
    }
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
    );
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
