'use strict'

import Hapi from 'hapi'

const server = new Hapi.server()

server.connection( { port: 4000 } )

