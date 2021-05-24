const route = require('express').Router();

const { Post } = require('../models');
const PostService = require('../services/PostService');
const { SUCCESS, NOT_FOUND } = require('./status');

const authMiddleware = require('../middlewares/authMiddleware');
const postMiddleware = require('../middlewares/postMiddleware');
const editPostMiddleware = require('../middlewares/editPostMiddleware');

route.use(authMiddleware);

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const post = await PostService.findOne(id);
  if (!post) return res.status(NOT_FOUND).json({ message: 'Post does not exist' });
  return res.status(SUCCESS).json(post);
});

route.put('/:id', editPostMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  await Post.update({ title, content }, { where: { id } });
  const { dataValues: {
    title: modifiedTitle,
    content: modifiedContent,
    userId,
    categories,
  } } = await PostService.findOne(id);

  return res.status(SUCCESS).json({
    title: modifiedTitle,
    content: modifiedContent,
    userId,
    categories,
  });
});

route.get('/', async (req, res) => {
  const posts = await PostService.findAll();
  return res.status(SUCCESS).json(posts);
});

route.use(postMiddleware);

route.post('/', async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { status, err, payload } = await PostService.create({
    title,
    content,
    userId: req.user.id,
    categoryIds,
  });
  if (err) return res.status(status).json({ message: err });
  return res.status(status).json(payload);
});

module.exports = route;
