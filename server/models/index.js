import Sequelize from 'sequelize';

const sequelize = new Sequelize('lilychat', 'postgres', 'postgres', {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  define: {
    underscored: true,
  },
});

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
  Channel: sequelize.import('./channel'),
  Group: sequelize.import('./group'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
