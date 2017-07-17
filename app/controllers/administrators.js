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
    db.employees.findAll().then(employees => {
      reply.view('allEmployees', {
        title: 'All Employees',
        employees: employees
      })
    })
  }
}

exports.displayEmployee = {

  handler: (request, reply) => {
    let data = request.params.id

    db.employees.find({
      where: { id: data },
      include: [{
        model: db.devices,
        where: { EmployeeId: data }
      }]
    }).then(employee => {
      console.log('employee: ' + JSON.stringify(employee, null, 2))
      reply.view('employeeDetails', {
        title: 'Employee Details',
        employee: employee
      })
    }).catch(err => {
      console.log(err)
    })
  }
}

exports.displayDelete = {

  handler: (request, reply) => {
    let data = request.payload

    db.employees.find({
      where: { id: data.employeeId },
      include: [{
        model: db.devices,
        where: { EmployeeId: data.employeeId }
      }]
    }).then(employee => {
      console.log('delete view employee: ' + JSON.stringify(employee, null, 2))
      reply.view('employeeDetails', {
        title: 'Employee Details',
        employee: employee,
        deleteOption: true
      })
    }).catch(err => {
      console.log(err)
    })
  }
}

exports.deleteEmployee = {

  handler: (request, reply) => {
    let data = request.payload.employeeId

    console.log('deleteEmployee payload data: ' + JSON.stringify(data, null, 2))

    async.series([
      callback => {
        db.devices.findAll({
          where: { EmployeeId: data }
        }).then(devices => {
          if(devices) {
            async.forEach(devices, (device, callback) => {
              db.devices.update({
                EmployeeId: null
              }, {
                where: {
                  serial_num: device.serial_num
                }
              }).then(() => {
                callback()
              }).catch(err => {
                callback(err)
              })
            }, err => {
              if(err) callback(err)
              callback()
            }) // close forEach
          } else {
            callback()
          }
        }) // close then
      }, // close 1st func
        callback => {
          db.employees.destroy({
            where: { id: data }
          }).then(() => {
            callback()
          }).catch(err => {
            callback(err)
          })
        }
    ], err => {
      if(err) return (err)
      reply.redirect('/showAllEmployees')
    })

  }
}

exports.displayByEmail = {

  handler: (request, reply) => {
    let data = request.payload
    console.log('displayByEmail payload: ' + JSON.stringify(data, null, 2))
    let errors = []

    db.employees.find({
      where: {
        email: data.email
      }
    }).then(returnedEmployee => {
      if (returnedEmployee) {
        console.log('first returnedEmployee: ' + JSON.stringify(returnedEmployee, null, 2))
        db.employees.find({
          where: {
            id: returnedEmployee.id
          },
          include: [{
            model: db.devices,
            where: { EmployeeId: returnedEmployee.id }
          }]
        }).then(returnedEmployee2 => {
          reply.view('employeeDetails', {
            title: 'Employee Details',
            employee: returnedEmployee2
          })
        })
      } else {
        errors.push({ message: data.email + ' not found. Please enter valid email' })
        reply.view('home', {
          title: 'Home',
          errors: errors
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
}

exports.displayType = {

  handler: (request, reply) => {
    let data = request.payload

    db.devices.findAll({
      where: { type: data.type }
    }).then(devices => {
      reply.view('allDevices', {
        pageHeader: 'All ' + data.type + 's',
        devices: devices
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
  }
}

exports.showDevices = {

  handler: (request, reply) => {
    db.devices.findAll({ include: [db.employees] }).then(devices => {
      console.log('showDevices JSON: ' + JSON.stringify(devices, null, 2))
      reply.view('allDevices', {
        title: 'All Devices',
        pageHeader: 'All Devices',
        devices: devices,
        showDelete: false
      })
    })
  }
}

exports.showDevicesDelete = {

  handler: (request, reply) => {
    db.devices.findAll({ include: [db.employees] }).then(devices => {
      console.log('showDeleteDevices JSON: ' + JSON.stringify(devices, null, 2))
      reply.view('allDevices', {
        title: 'All Devices',
        pageHeader: 'All Devices',
        devices: devices,
        showDelete: true
      })
    })
  }
}

exports.deleteDevice = {

  handler: (request, reply) => {
    let data = request.payload.serial_num
    let devices = []

    async.series([
      callback => {
        db.devices.findAll({
          where: {
            serial_num: data
          }
        }).then(returnedDevices => {
          devices = returnedDevices
          callback()
        }).catch(err => {
          callback(err)
        })
      },
      callback => {
        if(devices[0].EmployeeId) {
          db.devices.update({
            EmployeeId: null
          }, {
            where: {
              serial_num: data
            }
          }).then(updated => {
            console.log('Device ' + data + ' released: ' + updated)
            callback()
          }).catch(err => {
            callback (err)
          })
        }
      },
      callback => {
        db.devices.destroy({
          where: {
            serial_num: data
          }
        }).then(destroyed => {
          console.log('Device ' + data + ' deleted: ' + destroyed)
          callback()
        }).catch(err => {
          callback(err)
        })
      }
    ], err => {
      if(err) return(err)
      reply.redirect('/showAllDevices')
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
  }
}

exports.releaseDevice = {

  handler: (request, reply) => {
    let data = request.payload

    db.devices.update({
      EmployeeId: null
    }, {
      where: {
        serial_num: data.serial_num
      }
    }).then(() => {
      console.log('device ' + data.serial_num + ' released')
      reply.redirect('/showAllDevices')
    }).catch(err => {
      console.log(err)
    })
  }
}
