const { BAD_REQUEST } = require('../controllers/status');

function hasValidBody(body) {
  return !!body.title && !!body.content && !!body.categoryIds;
}

function getMissingField(body, validFields) {
  return validFields.find((key) => !body[key]);
}

module.exports = (req, res, next) => {
  if (!hasValidBody(req.body)) {
    const validFields = ['title', 'content', 'categoryIds'];
    const missingField = getMissingField(req.body, validFields);
    return res.status(BAD_REQUEST).json({
      message: `"${missingField}" is required`,
    });
  }

  next();
};
