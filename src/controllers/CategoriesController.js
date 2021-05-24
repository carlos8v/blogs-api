const route = require('express').Router();

const { Category } = require('../models');
const { CREATED } = require('./status');

const authMiddleware = require('../middlewares/authMiddleware');
const categoryMiddleware = require('../middlewares/categoryMiddleware');

route.use(categoryMiddleware);
route.use(authMiddleware);

route.post('/', async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name });
  
  return res.status(CREATED).json(category);
});

module.exports = route;
