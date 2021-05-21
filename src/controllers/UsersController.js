const route = require('express').Router();

const UserService = require('../services/UserService');
const userMiddleware = require('../middlewares/userMiddleware');

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
