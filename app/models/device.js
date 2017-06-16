/**
 * Created by johnokeeffe on 15/06/2017.
 */
'use strict'

module.exports = function (sequelize, DataTypes) {
  const Device = sequelize.define('Device', {
    serial_num: { type: DataTypes.STRING, primaryKey: true },
    type: DataTypes.STRING,
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Device.belongsTo(models.Employee)
      }
    }
  })
  return Device
}