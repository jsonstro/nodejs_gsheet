'use strict';
module.exports = (sequelize, DataTypes) => {
  var BCUs = sequelize.define('BCUs', {
    bcu_version: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
  }, {});
  BCUs.associate = function(models) {
    // associations can be defined here
    BCUs.hasMany(models.Versions, {
      foreignKey: 'bcu_version',
      sourceKey: 'bcu_version'
    });
  };
  return BCUs;
};
