/**
 * Created by johnokeeffe on 15/06/2017.
 */
'use strict'

const models = require('../models')
const shortId = require('shortid')

exports.main = {

  handler: (request, reply) => {
    reply.view('home', { title: 'Admin Home'})
  }
}

exports.addEmployee = {

  handler: (request, reply) => {
    let data = request.payload

    models.Employee.create({
      id: shortId.generate(),
      first_name: data.firstName,
      last_name: data.lastName,
      job_title: data.title,
      email: data.email
    }).then(createdEmployee => {
      console.log('employee saved to db: ' + createdEmployee)
      reply.view('home', { title: 'Admin Home'})
    }).catch(err => {
      console.log(err)
    })
  }
}
