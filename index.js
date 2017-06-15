'use strict'

const Hapi = require('hapi')
const Vision = require('vision')
const Inert = require('inert')
const models = require('./app/models')

const server = new Hapi.Server()

server.connection( { port: 4000, host: process.env.HARDWARE_HOST || 'localhost' } )

server.register([Vision, Inert], (err) => {
  if (err) {
    console.log(err)
  }

  server.views({
    engines: {
      hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: './app/views',
    layoutPath: './app/views/layout',
    partialsPath: './app/views/partials',
    //helpersPath: './app/views/helpers',
    layout: true,
    isCached: false
  })

  server.route(require('./routes'))

  // server.start((err) => {
  //   if (err) throw err
  //   console.log(`Server running at: ${server.info.uri}`)
  // })

  models.sequelize.sync({ force: true }).then(() => {
    server.start((err) => {
      if (err) {
        throw err
      }
      console.log(`Server running at: ${server.info.uri}`)
    })
  })


})