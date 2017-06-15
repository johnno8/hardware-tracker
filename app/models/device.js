/**
 * Created by johnokeeffe on 15/06/2017.
 */
'use strict'

module.exports = function (sequelize, DataTypes) {
  const Device = sequelize.define('Device', {
    id: { type: DataTypes.STRING, primaryKey: true },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    job_title: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Device.belongsTo(models.Employee)
      }
    }
  })
  return Device
}