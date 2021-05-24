const route = require('express').Router();

const { Category } = require('../models');
const { CREATED, SUCCESS } = require('./status');

const authMiddleware = require('../middlewares/authMiddleware');
const categoryMiddleware = require('../middlewares/categoryMiddleware');

route.use(authMiddleware);

route.get('/', async (req, res) => {
  const categories = await Category.findAll();  
  return res.status(SUCCESS).json(categories);
});

route.use(categoryMiddleware);

route.post('/', async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name });
  
  return res.status(CREATED).json(category);
});

module.exports = route;
