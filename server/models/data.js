'use strict';
module.exports = (sequelize, DataTypes) => {
  const Data = sequelize.define('Data', {
    id: DataTypes.INTEGER,
    created_by: DataTypes.TEXT,
    last_gdoc_row_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    deck_sn: {
      type: DataTypes.INTEGER(8), 
      primaryKey: true},
    motor_sn_l: DataTypes.TEXT,
    motor_sn_r: DataTypes.TEXT,
    motor_failure_code: DataTypes.TEXT,
    motor_comments: DataTypes.TEXT,
    motor_qa_sign_off: DataTypes.TEXT,
    ma1_date: DataTypes.DATE,
    bcu_version: DataTypes.TEXT,
    fw_version: DataTypes.TEXT,
    main_board_sn: DataTypes.TEXT,
    ma_failure_code: DataTypes.TEXT,
    ma_comments: DataTypes.TEXT,
    ma_qa_sign_off: DataTypes.TEXT,
    pkg_date: DataTypes.DATE,
    remote_sn: DataTypes.TEXT,
    battery_sn: DataTypes.TEXT,
    battery_failure_code: DataTypes.TEXT,
    battery_comments: DataTypes.TEXT,
    battery_qa_sign_off: DataTypes.TEXT,
    rflx_date: DataTypes.DATE,
    pcba_sn: DataTypes.TEXT,
    external_sn: DataTypes.TEXT,
    rflx_failure_code: DataTypes.TEXT,
    rflx_comments: DataTypes.TEXT,
    rflx_qa_sign_off: DataTypes.TEXT
  }, {});
  Data.associate = function(models) {
    // associations can be defined here
  };
  return Data;
};
