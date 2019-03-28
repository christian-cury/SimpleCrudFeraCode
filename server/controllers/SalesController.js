const express = require('express');
const couchdb = require('../database/couchdb');
const dotenv = require('dotenv');
const Logger = require('../helpers/Logger');
dotenv.config();

const COUCHDB_SALES_DBNAME = process.env.COUCHDB_SALES_MODEL || 'sales';

exports.index = async function(req, res) {
  const db = await couchdb.use(COUCHDB_SALES_DBNAME);
  await db.list({include_docs: true}).then(async docs => {
    Logger.info(`User (IP=${req.ip}) retrieve all sales. Body=${docs}`);
    await res.send({
      code: 200,
      message: 'all sales retrieved with success',
      data: docs
    });
  }).catch(async err => {
    Logger.warning(err);
    Logger.warning('CouchDB request error');
    Logger.warning(`User (IP=${req.ip}) failed retrieve sales.`);
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
  const db = await couchdb.use(COUCHDB_SALES_DBNAME);
  var model = req.body.model;
  await db.insert({
    model: model
  }).then(async body => {
    Logger.info(`User (IP=${req.ip}) inserted data in coudhdb. Body = ${body}`);
    await res.send({
      code: 200,
      message: 'sale inserted with success',
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
  const db = await couchdb.use(COUCHDB_SALES_DBNAME);
  const id = req.params.id;
  await db.list({include_docs: true}).then(async docs => {

    const sales = [];

    await docs.rows.forEach(async doc => {
      const doc = doc.doc;
      if(doc.diaperId == id) {
        sales.push(doc);
      }
    });
    Logger.info(`User (IP=${req.ip}) retrieve all sales of id=${id}. Body=${docs}`);
    await res.send({
      code: 200,
      message: 'all sales retrieved with success',
      data: sales
    });
  }).catch(async err => {
    Logger.warning(err);
    Logger.warning('CouchDB request error');
    Logger.warning(`User (IP=${req.ip}) failed retrieve sales.`);
    await res.send({
      code: 400,
      message: 'internal error',
      error: err
    })
  });
}

exports.update = async function(req, res) {

}

exports.destroy = async function(req, res) {
  const db = await couchdb.use(COUCHDB_SALES_DBNAME);
  var id = req.params.id;
  await db.get(id, { rev_info: true }).then(async doc => {
    await db.destroy(doc._id, doc._rev).then(async body => {
      Logger.info(`User (IP=${req.ip}) remove sales from database. Body=${body}`);
      await res.send({
        code: 200,
        message: 'sales deleted with success',
        data: body
      });
    }).catch(async err => {
      Logger.warning(err);
      Logger.warning('CouchDB request error');
      Logger.warning(`User (IP=${req.ip}) failed request a sales.`);
      await res.send({
        code: 400,
        message: 'internal error',
        error: err
      });
    });
  }).catch(async err => {
    Logger.warning(err);
    Logger.warning('CouchDB request error');
    Logger.warning(`User (IP=${req.ip}) failed request a sales. Data=(Sale not found)`);
    await res.send({
      code: 300,
      message: 'not found',
      error: 'model not found',
      err: err
    });
  });
}

