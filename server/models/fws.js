'use strict';
module.exports = (sequelize, DataTypes) => {
  var FWs = sequelize.define('FWs', {
    fw_version: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
  }, {});
  FWs.associate = function(models) {
    // associations can be defined here
    FWs.hasMany(models.Versions, {
      foreignKey: 'fw_version',
      sourceKey: 'fw_version'
    });
  };
  return FWs;
};
