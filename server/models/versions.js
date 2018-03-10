'use strict';
module.exports = (sequelize, DataTypes) => {
  var Versions = sequelize.define('Versions', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      //primaryKey: true
    },
    bcu_version: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    fw_version: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    date_changed: DataTypes.DATE
  }, {});
  Versions.associate = function(models) {
    // associations can be defined here
  };
  return Versions;
};
