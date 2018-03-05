'use strict';
module.exports = (sequelize, DataTypes) => {
  var Versions = sequelize.define('Versions', {
    id: {type: DataTypes.INTEGER(11), primaryKey: true},
    bcu_version: DataTypes.TEXT,
    fw_version: DataTypes.TEXT,
    date_changed: DataTypes.DATE
  }, {});
  Versions.associate = function(models) {
    // associations can be defined here
  };
  return Versions;
};
