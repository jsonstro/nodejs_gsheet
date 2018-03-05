'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER(11)
      },
      created_by: {
        type: Sequelize.TEXT
      },
      last_gdoc_row_id: {
        type: Sequelize.INT
      },
      date: {
        type: Sequelize.DATE
      },
      deck_sn: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER(8)
      },
      motor_sn_l: {
        type: Sequelize.TEXT
      },
      motor_sn_r: {
        type: Sequelize.TEXT
      },
      motor_failure_code: {
        type: Sequelize.TEXT
      },
      motor_comments: {
        type: Sequelize.TEXT
      },
      motor_qa_sign_off: {
        type: Sequelize.TEXT
      },
      ma1_date: {
        type: Sequelize.DATE
      },
      bcu_version: {
        type: Sequelize.TEXT
      },
      fw_version: {
        type: Sequelize.TEXT
      },
      main_board_sn: {
        type: Sequelize.TEXT
      },
      ma_failure_code: {
        type: Sequelize.TEXT
      },
      ma_comments: {
        type: Sequelize.TEXT
      },
      ma_qa_sign_off: {
        type: Sequelize.TEXT
      },
      pkg_date: {
        type: Sequelize.DATE
      },
      remote_sn: {
        type: Sequelize.TEXT
      },
      battery_sn: {
        type: Sequelize.TEXT
      },
      battery_failure_code: {
        type: Sequelize.TEXT
      },
      battery_comments: {
        type: Sequelize.TEXT
      },
      battery_qa_sign_off: {
        type: Sequelize.TEXT
      },
      rflx_date: {
        type: Sequelize.DATE
      },
      pcba_sn: {
        type: Sequelize.TEXT
      },
      external_sn: {
        type: Sequelize.TEXT
      },
      rflx_failure_code: {
        type: Sequelize.TEXT
      },
      rflx_comments: {
        type: Sequelize.TEXT
      },
      rflx_qa_sign_off: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('Data');
  }
};
