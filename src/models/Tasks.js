const Sequelize = require('sequelize');
const db = require('../config/db');

const Task = db.sequelize.define('tasks', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: 'users', 
    referencesKey: 'id' 
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  },
});

module.exports = Task;