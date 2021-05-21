const { BAD_REQUEST } = require('../controllers/status');

function validBody(body) {
  return body.email !== undefined && body.password !== undefined;
}

function getMissingField(body, validFields) {
  return validFields.find((key) => !body[key]);
}

function hasEmptyField(body) {
  return Object.keys(body).find((key) => body[key] === '');
}

module.exports = (req, res, next) => {
  if (!validBody(req.body)) {
    const missingField = getMissingField(req.body, ['email', 'password']);
    return res.status(BAD_REQUEST).json({
      message: `"${missingField}" is required`,
    });
  }

  if (hasEmptyField(req.body)) {
    return res.status(BAD_REQUEST).json({
      message: `"${hasEmptyField(req.body)}" is not allowed to be empty`,
    });
  }

  next();
};
