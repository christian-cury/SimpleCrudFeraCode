const express = require('express');
const couchdb = require('../database/couchdb');
const dotenv = require('dotenv');
const Logger = require('../helpers/Logger');
dotenv.config();

const COUCHDB_DBNAME = process.env.COUCHDB_DBNAME || 'feracode';

exports.index = async function(req, res) {
  const db = await couchdb.use(COUCHDB_DBNAME);
  await db.list({include_docs: true}).then(async docs => {
    const datas = [];
    var activeds = 0;
    await docs.rows.forEach(async doc => {
      const actived = await doc.doc.active;
      if(actived) {
        activeds++;
        await datas.push(doc);
      }
    });
    docs.total_rows = activeds;
    docs.rows = datas;
    Logger.info(`User (IP=${req.ip}) retrieve all diapers. Body=${docs}`);
    await res.send({
      code: 200,
      message: 'all diapers retrieved with success',
      data: docs
    });
  }).catch(async err => {
    Logger.warning(err);
    Logger.warning('CouchDB request error');
    Logger.warning(`User (IP=${req.ip}) failed retrieve diapers.`);
    await res.send({
      code: 400,
      message: 'internal error',
      error: err
    })
  })
}

exports.create = function(req, res) {

}

exports.store = async function(req, res) {
  const db = await couchdb.use(COUCHDB_DBNAME);
  var model = req.body.model || req.body.diaper.model;
  var description = req.body.description || req.body.diaper.description;
  var availableL = req.body.availableL || req.body.diaper.availableL;
  var availableM = req.body.availableM || req.body.diaper.availableM;
  var availableP = req.body.availableP || req.body.diaper.availableP;
  var boughtL = 0;
  var boughtM = 0;
  var boughtP = 0;
  var actived = true;
  await db.insert({
    model: model,
    description: description,
    availableL: availableL,
    availableM: availableM,
    availableP: availableP,
    boughtL: boughtL,
    boughtM: boughtM,
    boughtP: boughtP,
    active: actived
  }).then(async (body) => {
    Logger.info(`User (IP=${req.ip}) inserted data in coudhdb. Body = ${body}`);
    await res.send({
      code: 200,
      message: 'diaper inserted with success',
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
  const db = await couchdb.use(COUCHDB_DBNAME);
  var id = req.params.id;
  await db.get(id, { rev_info: true }).then(async doc => {
    Logger.info(`User (IP=${req.ip}) retrieved diaper details. Body=${doc}`);
    await res.send({
      code: 200,
      message: 'diaper retrieve with success',
      data: doc
    });
  }).catch(async err => {
    Logger.warning(err);
    Logger.warning('CouchDB request error');
    Logger.warning(`User (IP=${req.ip}) failed request a diper. Data=(Diaper not found)`);
    await res.send({
      code: 300,
      message: 'not found',
      error: 'diaper not found'
    });
  });
}

exports.update = async function(req, res) {
  const db = await couchdb.use(COUCHDB_DBNAME);
  var id = req.params.id;
  await db.get(id).then(async doc => {
    var model = req.body.model || doc.model;
    var description = req.body.description || doc.description;
    var availableL = req.body.availableL || doc.availableL;
    var availableM = req.body.availableM || doc.availableM;
    var availableP = req.body.availableP || doc.availableP;
    var boughtL = req.body.boughtL || doc.boughtL;
    var boughtM = req.body.boughtM || doc.boughtM;
    var boughtP = req.body.boughtP || doc.boughtP;
    var actived = doc.active;
    await db.insert({
      model: model,
      description: description,
      availableL: availableL,
      availableM: availableM,
      availableP: availableP,
      boughtL: boughtL,
      boughtM: boughtM,
      boughtP: boughtP,
      active: actived,
      _rev: doc._rev
    }, id).then(async (body) => {
      Logger.info(`User (IP=${req.ip}) update a diaper data. Body=${body}`);
      await res.send({
        code: 200,
        message: 'diaper updated with success',
        data: body
      });
    }).catch(async err => {
      Logger.warning(err);
      Logger.warning('CouchDB request error');
      Logger.warning(`User (IP=${req.ip}) failed request a diaper.`);
      await res.send({
        code: 400,
        message: 'internal error',
        error: err 
      });
    });
  }).catch(async err => {
    Logger.warning(err);
    Logger.warning('CouchDB request error');
    Logger.warning(`User (IP=${req.ip}) failed request a diper. Data=(Diaper not found)`);
    await res.send({
      code: 300,
      message: 'not found',
      error: 'diaper not found'
    });
  });
}

exports.deactivate = async function(req, res) {
  await changeActiveStatus(false, req, res);
}

exports.activate = async function(req, res) {
  await changeActiveStatus(true, req, res);
}

exports.destroy = async function(req, res) {
  const db = await couchdb.use(COUCHDB_DBNAME);
  var id = req.params.id;
  await db.get(id, { rev_info: true }).then(async doc => {
    await db.destroy(doc._id, doc._rev).then(async body => {
      Logger.info(`User (IP=${req.ip}) remove diaper from database. Body=${body}`);
      await res.send({
        code: 200,
        message: 'diaper deleted with success',
        data: body
      });
    }).catch(async err => {
      Logger.warning(err);
      Logger.warning('CouchDB request error');
      Logger.warning(`User (IP=${req.ip}) failed request a diaper.`);
      await res.send({
        code: 400,
        message: 'internal error',
        error: err
      });
    });
  }).catch(async err => {
    Logger.warning(err);
    Logger.warning('CouchDB request error');
    Logger.warning(`User (IP=${req.ip}) failed request a diaper. Data=(Diaper not found)`);
    await res.send({
      code: 300,
      message: 'not found',
      error: 'diaper not found',
      err: err
    });
  });
}

async function changeActiveStatus(activeStatus, req, res) {
  const db = await couchdb.use(COUCHDB_DBNAME);
  var id = req.params.id;
  await db.get(id).then(async doc => {
    var model = doc.model;
    var description = doc.description;
    var availableL = doc.availableL;
    var availableM = doc.availableM;
    var availableP = doc.availableP;
    var boughtL = doc.boughtL;
    var boughtM = doc.boughtM;
    var boughtP = doc.boughtP;
    var actived = activeStatus;
    await db.insert({
      model: model,
      description: description,
      availableL: availableL,
      availableM: availableM,
      availableP: availableP,
      boughtL: boughtL,
      boughtM: boughtM,
      boughtP: boughtP,
      active: actived,
      _rev: doc._rev
    }, id).then(async (body) => {
      Logger.info(`User (IP=${req.ip}) change data active to ${actived}. Body=${body}`);
      await res.send({
        code: 200,
        message: 'diaper ' + (actived ? 'actived' : 'deactived') + ' with success',
        data: body
      });
    }).catch(async err => {
      Logger.warning(err);
      Logger.warning('CouchDB request error');
      Logger.warning(`User (IP=${req.ip}) failed request a diaper.`);
      await res.send({
        code: 400,
        message: 'internal error',
        error: err 
      });
    });
  }).catch(async err => {
    Logger.warning(err);
      Logger.warning('CouchDB request error');
      Logger.warning(`User (IP=${req.ip}) failed request a diaper. Data=(Diaper not found)`);
    await res.send({
      code: 300,
      message: 'not found',
      error: 'diaper not found'
    });
  });
}