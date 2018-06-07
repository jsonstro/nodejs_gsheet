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
      queryInterface.addColumn('RushOrders', 'spc_code', Sequelize.STRING),
      queryInterface.addColumn('RushOrders', 'inpart', Sequelize.STRING)
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
      queryInterface.removeColumn('RushOrders', 'spc_code', Sequelize.STRING),
      queryInterface.removeColumn('RushOrders', 'inpart', Sequelize.STRING)
    ]
  }
};
