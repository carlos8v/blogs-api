const route = require('express').Router();

const { SUCCESS, BAD_REQUEST } = require('./status');

const { User } = require('../models');
const jwt = require('../services/jwt');
const loginMiddleware = require('../middlewares/loginMiddleware');

route.use(loginMiddleware);

route.post('/', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, password } });
  if (!user) return res.status(BAD_REQUEST).json({ message: 'Invalid fields' });

  const token = jwt.sign({ id: user.id, email: user.email });
  return res.status(SUCCESS).json({ token });
});

module.exports = route;
