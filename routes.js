/**
 * Created by johnokeeffe on 15/06/2017.
 */
'use strict'

const Administrators = require('./app/controllers/administrators')
const Assets = require('./app/controllers/assets')

module.exports = [
  { method: 'GET', path: '/', config: Administrators.home },
  { method: 'GET', path: '/employee', config: Administrators.main },
  { method: 'POST', path: '/addemployee', config: Administrators.addEmployee },
  { method: 'GET', path: '/device', config: Administrators.device },
  { method: 'POST', path: '/adddevice', config: Administrators.adddevice },
  { method: 'GET', path: '/showAllEmployees', config: Administrators.showEmployees },
  { method: 'GET', path: '/showAllDevices', config: Administrators.showDevices },

  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory
  }
]