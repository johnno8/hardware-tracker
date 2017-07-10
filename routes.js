/**
 * Created by johnokeeffe on 15/06/2017.
 */
'use strict'

const Administrators = require('./app/controllers/administrators')
const Assets = require('./app/controllers/assets')

module.exports = [
  { method: 'GET', path: '/', config: Administrators.home },
  { method: 'GET', path: '/employee', config: Administrators.main },
  { method: 'GET', path: '/employee/{id}', config: Administrators.displayEmployee },
  { method: 'POST', path: '/employeesearch', config: Administrators.displayByEmail },
  { method: 'POST', path: '/addemployee', config: Administrators.addEmployee },
  { method: 'POST', path: '/displayDelete', config: Administrators.displayDelete },
  { method: 'POST', path: '/employee/delete', config: Administrators.deleteEmployee },
  { method: 'GET', path: '/device', config: Administrators.device },
  { method: 'POST', path: '/adddevice', config: Administrators.adddevice },
  { method: 'GET', path: '/showAllEmployees', config: Administrators.showEmployees },
  { method: 'GET', path: '/showAllDevices', config: Administrators.showDevices },
  { method: 'POST', path: '/assignment', config: Administrators.assignment },
  { method: ['GET','POST'], path: '/showDevicesDelete', config: Administrators.showDevicesDelete },
  { method: 'POST', path: '/assignDevice', config: Administrators.assignDevice },
  { method: 'POST', path: '/release', config: Administrators.releaseDevice },
  { method: 'POST', path: '/device/type', config: Administrators.displayType },

  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory
  }
]
