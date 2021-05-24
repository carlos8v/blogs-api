const route = require('express').Router();

const PostService = require('../services/PostService');
const { SUCCESS } = require('./status');

const authMiddleware = require('../middlewares/authMiddleware');
const postMiddleware = require('../middlewares/postMiddleware');

route.use(authMiddleware);

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
