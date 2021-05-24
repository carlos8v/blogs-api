const { BAD_REQUEST } = require('../controllers/status');

function bodyExists(body) {
  return !!body.displayName && !!body.email && !!body.password && !!body.image;
}

function getMissingField(body, validFields) {
  return validFields.find((key) => !body[key]);
}

function hasValidLength(body) {
  const validFields = [
    { key: 'displayName', minLength: 8 },
    { key: 'password', minLength: 6 },
  ];
  
  return validFields.every(({ key, minLength }) => body[key].length >= minLength);
}

function getLowLengthField(body) {
  const validFields = [
    { key: 'displayName', minLength: 8, message: 'length must be at least 8 characters long' },
    { key: 'password', minLength: 6, message: 'length must be 6 characters long' },
  ];
  
  return validFields.find(({ key, minLength }) => body[key].length < minLength);
}

module.exports = (req, res, next) => {
  if (!bodyExists(req.body)) {
    const validFields = ['displayName', 'email', 'password', 'image'];
    const missingField = getMissingField(req.body, validFields);
    return res.status(BAD_REQUEST).json({
      message: `"${missingField}" is required`,
    });
  }

  const { email, displayName, password } = req.body;
  if (!/[\w]+@[\w]+.com/g.test(email)) {
    return res.status(BAD_REQUEST).json({ message: '"email" must be a valid email' });
  }

  if (!hasValidLength({ password, displayName })) {
    const { key, message } = getLowLengthField({ password, displayName });
    return res.status(BAD_REQUEST).json({
      message: `"${key}" ${message}`,
    });
  }

  next();
};
