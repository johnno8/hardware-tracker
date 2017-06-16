/**
 * Created by johnokeeffe on 15/06/2017.
 */
'use strict'

const models = require('../models')
const shortId = require('shortid')

exports.home = {

  handler: (request, reply) => {
    reply.view('home', { title: 'Home' })
  }
}

exports.main = {

  handler: (request, reply) => {
    reply.view('employee', { title: 'Add Employee' })
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
      console.log('employee saved to db: ' + JSON.stringify(createdEmployee, null, 2))
      reply.redirect('/employee')
    }).catch(err => {
      console.log(err)
    })
  }
}

exports.showEmployees = {

  handler: (request, reply) => {
    models.Employee.findAll().then(employees => {
      reply.view('allEmployees', {
        title: 'All Employees',
        employees: employees
      })
    })
  }
}

exports.device = {

  handler: (request, reply) => {
    reply.view('device', { title: 'Add Device' })
  }
}

exports.adddevice = {

  handler: (request, reply) => {
    let data = request.payload

    models.Device.create({
      serial_num: data.serialnum,
      type: data.type,
      make: data.make,
      model: data.model,
      description: data.description,
    }).then(createdDevice => {
      console.log('device saved to db: ' + JSON.stringify(createdDevice, null, 2))
      reply.redirect('/device')
    }).catch(err => {
      console.log(err)
    })
  }
}

exports.showDevices = {

  handler: (request, reply) => {
    models.Device.findAll().then(devices => {
      reply.view('allDevices', {
        title: 'All Devices',
        devices: devices
      })
    })
  }
}
