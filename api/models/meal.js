'use strict';
module.exports = function(sequelize, DataTypes) {
  var Meal = sequelize.define('Meal', {
    name: DataTypes.STRING,
    green: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0
    },
    purple: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0
    },
    red: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0
    },
    yellow: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0
    },
    blue: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0
    },
    orange: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0
    },
    teaspoon: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0
    },
  }, {
    classMethods: {
      associate: function(models) {
        Meal.belongsToMany(models.Tag, {through: 'TagMeal'});
      }
    }
  });
  return Meal;
};