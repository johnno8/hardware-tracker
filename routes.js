/**
 * Created by johnokeeffe on 15/06/2017.
 */
'use strict'

const Administrators = require('./app/controllers/administrators')
const Assets = require('./app/controllers/assets')

module.exports = [
  { method: 'GET', path: '/home', config: Administrators.main },

  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory
  }
]