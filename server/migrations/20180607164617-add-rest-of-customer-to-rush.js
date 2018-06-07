'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return [ 
      queryInterface.addColumn('RushOrders', 'lastname', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'company', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'addr', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'addr2', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'city', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'state', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'zipcode', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'cntry', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'phone', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'email', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'ship_first', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'ship_last', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'ship_co', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'ship_addr', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'ship_addr2', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'ship_city', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'ship_st', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'ship_zip', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'ship_ctry', Sequelize.STRING)
    ]
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return [ 
      queryInterface.removeColumn('RushOrders', 'lastname', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'company', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'addr', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'addr2', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'city', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'state', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'zipcode', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'cntry', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'phone', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'email', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'ship_first', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'ship_last', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'ship_co', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'ship_addr', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'ship_addr2', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'ship_city', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'ship_st', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'ship_zip', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'ship_ctry', Sequelize.STRING)
    ]
  }
};
