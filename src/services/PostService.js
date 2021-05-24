const { Category, Post } = require('../models');
const { CREATED, BAD_REQUEST } = require('../controllers/status');

async function checkCategories(categoryList) {
  const categoriesPromises = categoryList
    .map((categoryId) => Category.findByPk(categoryId));
  
  const categories = await Promise.all(categoriesPromises);
  return categories.every((category) => !!category);
}

module.exports = {
  create: async ({ title, content, userId, categoryIds }) => {
    const hasValidCategories = await checkCategories(categoryIds);
    if (!hasValidCategories) {
      return { status: BAD_REQUEST, err: '"categoryIds" not found' };
    }

    const post = await Post.create({
      title,
      content,
      userId,
      categoryIds,
    });

    return { status: CREATED, payload: post };
  },
};
