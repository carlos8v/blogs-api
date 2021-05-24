module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'BlogPosts',
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      key: 'id', as: 'user',
    });
  };

  return Post;
};
