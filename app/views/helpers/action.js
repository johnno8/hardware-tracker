/**
 * Created by johnokeeffe on 23/06/2017.
 */
'use strict'

function action (context) {
  console.log('action helper context: ' + JSON.stringify(context, null, 2))
  if (context.EmployeeId) {
    return '' + '<form action="/release" method="POST">' +
        '<input name="serial_num" type="hidden" value="' + context.serial_num + '">' +
        '<input name="EmployeeId" type="hidden" value="' + context.EmployeeId + '">' +
        '<button class="ui fluid grey submit button">Release</button>' +
        '</form>'
  } else {
    return '' + '<form action="/assignment" method="POST">' +
        '<input name="serial_num" type="hidden" value="' + context.serial_num + '">' +
        '<input name="type" type="hidden" value="' + context.type + '">' +
        '<input name="make" type="hidden" value="' + context.make + '">' +
        '<input name="model" type="hidden" value="' + context.model + '">' +
        '<input name="description" type="hidden" value="' + context.description + '">' +
        '<button class="ui fluid blue submit button">Assign</button>' +
        '</form>'
  }
}

module.exports = action
