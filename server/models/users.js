'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    id: DataTypes.INTEGER(11),
    username: {type: DataTypes.TEXT, primaryKey: true},
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
    passwd: DataTypes.TEXT
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  Users.hasMany(Data, {foreignKey: 'created_by', sourceKey: 'username'});
  Users.hasMany(RushOrders, {foreignKey: 'created_by', sourceKey: 'username'});
  return Users;
};
