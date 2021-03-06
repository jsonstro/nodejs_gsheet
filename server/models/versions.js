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
      allowNull: false,
      primaryKey: true
    },
    fw_version: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    date_changed: DataTypes.DATE,
    created_by: DataTypes.TEXT
  }, {});
  Versions.associate = function(models) {
    // associations can be defined here
  };
  return Versions;
};
