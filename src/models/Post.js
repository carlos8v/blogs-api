module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER },
  }, {
    timestamps: false,
    tableName: 'BlogPosts',
  });

  return Post;
};
