/**
 * Created by johnokeeffe on 15/06/2017.
 */
'use strict'

exports.main = {

  handler: (request, reply) => {
    reply.view('home', { title: 'Hardware Tracker'})
  }
}
