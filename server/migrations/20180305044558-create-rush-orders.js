'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RushOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER(11)
      },
      deck_sn: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER(8)
      },
      ordernum: {
        type: Sequelize.TEXT
      },
      alternateid: {
        type: Sequelize.TEXT
      },
      internalid: {
        type: Sequelize.TEXT
      },
      shipvia: {
        type: Sequelize.TEXT
      },
      weight: {
        type: Sequelize.TEXT
      },
      trackingnu: {
        type: Sequelize.TEXT
      },
      shipdate: {
        type: Sequelize.DATE
      },
      item: {
        type: Sequelize.TEXT
      },
      qty_order: {
        type: Sequelize.INTEGER
      },
      qty_fulfil: {
        type: Sequelize.INTEGER
      },
      partialful: {
        type: Sequelize.TEXT
      },
      fully_fulf: {
        type: Sequelize.TEXT
      },
      created_by: {
        type: Sequelize.TEXT,
        references: {
          model: 'Users',
          key: 'username',
          as: 'created_by',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RushOrders');
  }
};
