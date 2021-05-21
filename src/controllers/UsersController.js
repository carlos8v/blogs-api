const route = require('express').Router();

const { SUCCESS } = require('./status');

const { User } = require('../models');
const UserService = require('../services/UserService');
const userMiddleware = require('../middlewares/userMiddleware');

const authMiddleware = require('../middlewares/authMiddleware');

route.get('/', authMiddleware, async (req, res) => {
  const users = await User.findAll();
  return res.status(SUCCESS).json(users);
});

route.use(userMiddleware);

route.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { status, message, payload } = await UserService.create({
    email,
    image,
    password,
    displayName,
  });
  if (message) return res.status(status).json({ message });
  return res.status(status).json(payload);
});

module.exports = route;
