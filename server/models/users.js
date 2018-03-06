'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    id: DataTypes.INTEGER(11),
    username: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
    type: DataTypes.TEXT,
    passwd: DataTypes.TEXT
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
    Users.hasMany(models.Data, {
      foreignKey: 'created_by', 
      sourceKey: 'username'
    });
    Users.hasMany(models.RushOrders, {
      foreignKey: 'created_by', 
      sourceKey: 'username'
    });
  };
  return Users;
};
