// -*- mode: js; js-indent-level:2; -*-
/* Copyright 2018-present Samsung Electronics Co., Ltd. and other contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var EventEmitter = require('events').EventEmitter;
var Uart = require('uart');
var uart = new Uart();

function log(arg) {
  if (true)    
    return; // TODO: silent mode if !true
  try {
    console.log("log: serialport: " + JSON.stringify(arg));
  } catch (err) {
    console.log("log: serialport: err" + err);
    console.log("log: serialport: arg: " + arg);
  }
}

function SerialPort(device, configuration) {
  configuration.device = device;
  var self = this;
  EventEmitter.call(this);
  this.configuration = configuration;
  this.onError = function(err) {
    log('error: ' + err);
    self.emit("error", err);
  }

  log('About to open: ' + configuration.device);
  this.uart = uart.open(configuration, function(err) {
    log('opened: ' + err);
    if (err) {
      self.emit("error", err);
    } else {
      self.uart.on('error', self.onError);
      self.uart.on('data', function(data) {
        log('data: ' + data);
	self.emit("data", data && data.toString());
      });
    }
  });

  return this;
}

SerialPort.prototype = Object.create(require('events').EventEmitter.prototype);

SerialPort.prototype.write = function write(message, callback) {
  log('About to write: ' +  message);
  if ( this.uart && this.uart.write) {
    this.uart.write(message, callback);
  }
}

module.exports = SerialPort;
