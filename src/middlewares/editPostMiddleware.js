const { BAD_REQUEST, UNAUTHORIZED } = require('../controllers/status');

const { Post } = require('../models');

async function checkIsOwner(postId, userId) {
  const post = await Post.findByPk(postId);
  return post.dataValues.id === userId;
}

function hasValidBody(body) {
  return !!body.title && !!body.content;
}

function getMissingField(body, validFields) {
  return validFields.find((key) => !body[key]);
}

module.exports = async (req, res, next) => {
  const isOwner = await checkIsOwner(req.params.id, req.user.id);
  if (!isOwner) {
    return res.status(UNAUTHORIZED).json({ message: 'Unauthorized user' });
  }

  if (!hasValidBody(req.body)) {
    const missingField = getMissingField(req.body, ['title', 'content']);
    return res.status(BAD_REQUEST).json({ message: `"${missingField}" is required` });
  }

  if (req.body.categoryIds) {
    return res.status(BAD_REQUEST).json({ message: 'Categories cannot be edited' });
  }

  next();
};
