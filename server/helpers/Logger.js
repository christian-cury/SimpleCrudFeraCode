const dotenv = require('dotenv');
dotenv.config();

const APP_DEBUG = process.env.APP_DEBUG || true;

exports.info = function(log) {
  if(!APP_DEBUG) return;
  console.log(`[INFO]: ${log}`);
}

exports.warning = function(log) {
  if(!APP_DEBUG) return;
  console.log(`[WARNING]: ${log}`);
}

exports.error = function(log) {
  if(!APP_DEBUG) return;
  console.log(`[ERROR]: ${log}`);
}

module.exports = this;