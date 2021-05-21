const Sequelize = require('sequelize');
const config = require('../db/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const { User } = require('../models');
const jwt = require('./jwt');
const { CREATED, CONFLICT, INTERNAL_ERROR } = require('../controllers/status');

module.exports = {
  create: async ({ displayName, email, password, image }) => {
    const alreadyExists = await User.findOne({ where: { email } });
    if (alreadyExists) {
      return { status: CONFLICT, message: 'User already registered' };
    }

    const trx = await sequelize.transaction();
    try {
      const user = await User.create({ displayName, email, password, image });
      const token = jwt.sign({ id: user.id, email: user.email });

      await trx.commit();
      return { status: CREATED, payload: { token } };
    } catch (error) {
      await trx.rollback();
      return { status: INTERNAL_ERROR, message: 'Internal error' };
    }
  },
};
