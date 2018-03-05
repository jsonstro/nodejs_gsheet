'use strict';
module.exports = (sequelize, DataTypes) => {
  const RushOrders = sequelize.define('RushOrders', {
    id: DataTypes.INTEGER(11),
    deck_sn: {type: DataTypes.INTEGER(8), primaryKey: true},
    ordernum: DataTypes.TEXT,
    alternateid: DataTypes.TEXT,
    internalid: DataTypes.TEXT,
    shipvia: DataTypes.TEXT,
    weight: DataTypes.TEXT,
    trackingnu: DataTypes.TEXT,
    shipdate: DataTypes.DATE,
    item: DataTypes.TEXT,
    qty_order: DataTypes.INTEGER,
    qty_fulfil: DataTypes.INTEGER,
    partialful: DataTypes.TEXT,
    fully_fulf: DataTypes.TEXT,
    created_by: DataTypes.TEXT
  }, {});
  RushOrders.associate = function(models) {
    // associations can be defined here
  };
  //RushOrders.belongsTo(Data, {foreignKey: 'deck_sn'});
  return RushOrders;
};
