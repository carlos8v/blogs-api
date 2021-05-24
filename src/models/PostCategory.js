function getAssociations(PostCategory) {
  return (models) => {
    models.Category.belongsToMany(models.Post, {
      as: 'posts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
      
    models.Post.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
}

module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {}, {
    timestamps: false,
    tableName: 'PostsCategories',
  });

  PostCategory.associate = getAssociations(PostCategory);

  return PostCategory;
};
