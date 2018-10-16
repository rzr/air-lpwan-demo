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

//'use strict'; //TODO

function log(/*...*/) {
  try {
    console.log.apply(console, [].slice.call(arguments));
    // console.log("log: " + JSON.stringify(arg));
  } catch (err) {
    console.log("log: err: " + err);
    console.log("log: err");
  }
}

function die(err, message) {
  var text = "error: fatal: " + message;
  log("die:" + text);
  try {
    text += err.message;
  } catch (err) {
    text += err;
  }
  log("die:");
  log(text);
  process.exit(1);
  return text;
}

var pwd = "../";
var runtime = "iotjs";
if (undefined !== process.argv[0]) {
  console.log(process);
  runtime = process.argv[0];
}
console.log("pwd: " + pwd);

var fs = require('fs');
var config = pwd  + 'private/config.js';
console.log(config);
if (! fs.existsSync(config)) {
  config = pwd + 'config.js';
}
var Config = require(config);
console.log(JSON.stringify(Config));

var LoraWan = require('lorawan');
var lpwan = new LoraWan(Config.lorawan);

setTimeout(function() {
  lpwan.start();
}, 1 * 1000);

setTimeout(function() {
  lpwan.send(Number(new Date()).toString(16));
}, 10 * 1000);

