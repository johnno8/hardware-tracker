/**
 * Created by johnokeeffe on 15/06/2017.
 */
'use strict'

// const models = require('../models')
const db = require('../models/index.js')
const shortId = require('shortid')
const async = require('async')

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

    // models.Employee.create({
    db.employees.create({
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
    // models.Employee.findAll().then(employees => {
    db.employees.findAll().then(employees => {
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
    console.log('payload: ' + JSON.stringify(data, null, 2))

    // models.Employee.find({
    db.employees.find({
      where: { email: data.email }
    }).then(employee => {
      // models.Device.create({
      db.devices.create({
        serial_num: data.serialnum,
        type: data.type,
        make: data.make,
        model: data.model,
        description: data.description
        // EmployeeId: employee.id
      }).then(createdDevice => {
        console.log('device saved to db: ' + JSON.stringify(createdDevice, null, 2))
        reply.redirect('/device')
      }).catch(err => {
        console.log(err)
      })
    })

    /*
    models.Device.create({
      serial_num: data.serialnum,
      type: data.type,
      make: data.make,
      model: data.model,
      description: data.description,
      EmployeeId: null
    }).then(createdDevice => {
      console.log('device saved to db: ' + JSON.stringify(createdDevice, null, 2))
      reply.redirect('/device')
    }).catch(err => {
      console.log(err)
    }) */
  }
}

exports.showDevices = {

  handler: (request, reply) => {
    // models.Device.findAll().then(devices => {
    db.devices.findAll().then(devices => {
      reply.view('allDevices', {
        title: 'All Devices',
        devices: devices
      })
    })
  }
}

exports.assignment = {

  handler: (request, reply) => {
    let data = request.payload

    reply.view('assignment', {
      title: 'Assign a Device',
      serial_num: data.serial_num,
      type: data.type,
      make: data.make,
      model: data.model,
      description: data.description
    })
  }
}

exports.assignDevice = {

  handler: (request, reply) => {
    let data = request.payload
    console.log('assignment payload: ' + JSON.stringify(data, null, 2))
    let employeeId

    async.series([
      callback => {
        db.employees.findAll({
          where: {email: data.email}
        }).then(employee => {
          employeeId = employee[0].id
          console.log('employeeId: ' + employeeId)
          callback()
        }).catch(err => {
          callback(err)
        })
      },
      callback => {
        db.devices.update({
          // db.devices.upsert({
          serial_num: data.serial_num,
          type: data.type,
          make: data.make,
          model: data.model,
          description: data.description,
          EmployeeId: employeeId
        }, {
          where: {
            serial_num: data.serial_num
          }
        }).then(() => {
          console.log('device updated')
          callback()
        }).catch(err => {
          callback(err)
        })
      }
    ], err => {
      if (err) return (err)
      reply.redirect('/showAllDevices')
    })
    /*
    db.employees.findAll({
      where: {email: data.email}
    }).then(employee => {
      console.log('found_employee: ' + JSON.stringify(employee, null, 2))
      db.devices.update({
          EmployeeID: employee[0].id
        },{
        where: {
          serial_num: data.serial_num
        }
      })
    }).then(() => {
      console.log('success, device ' + data.serial_num + ' associated with employee ' + data.email)
      reply.redirect('/showAllDevices')
    }).catch(err => {
      console.log(err)
    }) */

    /*
    models.Device.findById(data.serial_num).then(device => {
      models.Employee.findAll({
        where: {email: data.email}
      })
    }).then(employee => {
      models.Device.setEmployee([employee]).then(() => {
        console.log('success, device ' + data.serial_num + ' associated with employee ' + employee.email)
        reply.redirect('/showAllDevices')
      })
    }).catch(err => {
      console.log(err)
    }) */
  }
}
