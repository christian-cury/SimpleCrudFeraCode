const express = require('express');
const couchdb = require('../database/couchdb');
const dotenv = require('dotenv');
const Logger = require('../helpers/Logger');
dotenv.config();

const COUCHDB_MODEL_DBNAME = process.env.COUCHDB_DBNAME_MODEL || 'models';

exports.index = async function(req, res) {
  const db = await couchdb.use(COUCHDB_MODEL_DBNAME);
  await db.list().then(async docs => {
    for(var a in docs.rows) {
      let id = docs.rows[a].id;
      await db.get(id, { rev_info: true }).then(doc => {
        docs.rows[a].data = doc;
      });
    }
    Logger.info(`User (IP=${req.ip}) retrieve all models. Body=${docs}`);
    await res.send({
      code: 200,
      message: 'all models retrieved with success',
      data: docs
    });
  }).catch(async err => {
    Logger.warning(err);
    Logger.warning('CouchDB request error');
    Logger.warning(`User (IP=${req.ip}) failed retrieve models.`);
    await res.send({
      code: 400,
      message: 'internal error',
      error: err
    })
  });
}

exports.create = async function(req, res) {
  
}

exports.store = async function(req, res) {
  const db = await couchdb.use(COUCHDB_MODEL_DBNAME);
  var model = req.body.model;
  await db.insert({
    model: model
  }).then(async body => {
    Logger.info(`User (IP=${req.ip}) inserted data in coudhdb. Body = ${body}`);
    await res.send({
      code: 200,
      message: 'model inserted with success',
      data: body
    });
  }).catch(async err => {
    Logger.warning(err);
    Logger.warning('CouchDB request error');
    Logger.warning(`User (IP=${req.ip}) failed insert data.`);
    await res.send({
      code: 400,
      message: 'internal error',
      error: err 
    });
  });
}

exports.show = async function(req, res) {

}

exports.update = async function(req, res) {

}

exports.destroy = async function(req, res) {
  const db = await couchdb.use(COUCHDB_MODEL_DBNAME);
  var id = req.params.id;
  await db.get(id, { rev_info: true }).then(async doc => {
    await db.destroy(doc._id, doc._rev).then(async body => {
      Logger.info(`User (IP=${req.ip}) remove model from database. Body=${body}`);
      await res.send({
        code: 200,
        message: 'model deleted with success',
        data: body
      });
    }).catch(async err => {
      Logger.warning(err);
      Logger.warning('CouchDB request error');
      Logger.warning(`User (IP=${req.ip}) failed request a model.`);
      await res.send({
        code: 400,
        message: 'internal error',
        error: err
      });
    });
  }).catch(async err => {
    Logger.warning(err);
    Logger.warning('CouchDB request error');
    Logger.warning(`User (IP=${req.ip}) failed request a model. Data=(Model not found)`);
    await res.send({
      code: 300,
      message: 'not found',
      error: 'model not found',
      err: err
    });
  });
}

