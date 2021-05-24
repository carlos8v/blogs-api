const { UNAUTHORIZED } = require('../controllers/status');

const jwt = require('../services/jwt');

const { User } = require('../models');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(UNAUTHORIZED).json({ message: 'Token not found' });

  try {
    const payload = jwt.verify(auth);
    const user = await User.findByPk(payload.id);
    req.user = user.dataValues;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};
