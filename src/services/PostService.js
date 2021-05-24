const { Category, Post, User, PostCategory } = require('../models');
const { CREATED, BAD_REQUEST } = require('../controllers/status');

async function checkCategories(categoryList) {
  const categoriesPromises = categoryList
    .map((categoryId) => Category.findByPk(categoryId));
  
  const categories = await Promise.all(categoriesPromises);
  return categories.every((category) => !!category);
}

async function createCategoryAssociation(id, categoryIds) {
  await Promise.all(categoryIds.map((category) => PostCategory.create({
    postId: id,
    categoryId: category,
  })));
}

module.exports = {
  findAll: async () => {
    const userAttributes = ['id', 'displayName', 'email', 'image'];
    const posts = await Post.findAll({
      include: [
        { model: User, as: 'user', attributes: userAttributes },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return posts;
  },
  create: async ({ title, content, userId, categoryIds }) => {
    const hasValidCategories = await checkCategories(categoryIds);
    if (!hasValidCategories) {
      return { status: BAD_REQUEST, err: '"categoryIds" not found' };
    }

    const now = new Date();
    const post = await Post.create({
      title,
      content,
      userId,
      published: now,
      updated: now,
    });

    await createCategoryAssociation(post.dataValues.id, categoryIds);

    return { status: CREATED, payload: post };
  },
};
