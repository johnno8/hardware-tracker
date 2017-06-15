/**
 * Created by johnokeeffe on 15/06/2017.
 */
'use strict'

require('dotenv').config()

module.exports = {
  pg: {
    name: process.env.PG_NAME || 'postgres',
    host: process.env.PG_HOST || 'localhost',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'postgres',
    dialect: process.env.DIALECT || 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
}
