const { BAD_REQUEST } = require('../controllers/status');

module.exports = (req, res, next) => {
  if (!req.body.name) {
    return res.status(BAD_REQUEST).json({
      message: '"name" is required',
    });
  }

  next();
};
