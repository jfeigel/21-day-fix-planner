'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Meals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      green: {
        type: Sequelize.DECIMAL
      },
      purple: {
        type: Sequelize.DECIMAL
      },
      red: {
        type: Sequelize.DECIMAL
      },
      yellow: {
        type: Sequelize.DECIMAL
      },
      blue: {
        type: Sequelize.DECIMAL
      },
      orange: {
        type: Sequelize.DECIMAL
      },
      teaspoon: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Meals');
  }
};