'use strict';
module.exports = (sequelize, DataTypes) => {
  const RushOrders = sequelize.define('RushOrders', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    deck_sn: {
      type: DataTypes.INTEGER(8), 
      primaryKey: true,
      //references: {
      //  model: 'Data',
      //  key: 'deck_sn',
      //  as: 'deck_sn',
      //},
    },
    ordernum: DataTypes.TEXT,
    alternateid: DataTypes.TEXT,
    internalid: DataTypes.TEXT,
    trackingnu: DataTypes.TEXT,
    shipdate: DataTypes.DATE,
    item: DataTypes.TEXT,
    spc_code: DataTypes.TEXT,
    inpart: DataTypes.TEXT,
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
    company: DataTypes.TEXT,
    addr: DataTypes.TEXT,
    addr2: DataTypes.TEXT,
    city: DataTypes.TEXT,
    state: DataTypes.TEXT,
    zipcode: DataTypes.TEXT,
    cntry: DataTypes.TEXT,
    phone: DataTypes.TEXT,
    email: DataTypes.TEXT,
    ship_first: DataTypes.TEXT,
    ship_last: DataTypes.TEXT,
    ship_co: DataTypes.TEXT,
    ship_addr: DataTypes.TEXT,
    ship_addr2: DataTypes.TEXT,
    ship_city: DataTypes.TEXT,
    ship_st: DataTypes.TEXT,
    ship_zip: DataTypes.TEXT,
    ship_ctry: DataTypes.TEXT,
    created_by: DataTypes.TEXT
  }, {});
  RushOrders.associate = function(models) {
    // associations can be defined here
    //RushOrders.belongsTo(models.Data, {
    //  foreignKey: 'deck_sn'
    //});
  };
  return RushOrders;
};
