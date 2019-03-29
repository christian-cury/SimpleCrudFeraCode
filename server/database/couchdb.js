
const dotenv = require('dotenv');
dotenv.config();

const COUCHDB_HOST = process.env.COUCHDB_HOST || 'http://localhost:5984';
const COUCHDB_DBNAME = process.env.COUCHDB_DBNAME || 'feracode';
const COUCHDB_MODEL_DBNAME = process.env.COUCHDB_DBNAME_MODEL || 'models';
const COUCHDB_SALES_DBNAME = process.env.COUCHDB_SALES_MODEL || 'sales';

const express = require('express');
const nano = require('nano')(COUCHDB_HOST);

async function createDatabase(dbName) {
  await nano.db.get(dbName).then(async data => {
    await console.log(`Database ${dbName} already exists`);
  }).catch(async err => {
    console.log(err);
    await console.log(`Database ${dbName} not exists, creating`);
    await nano.db.create(dbName).then(async data => {
      await console.log(`Database ${dbName} created with success`);
    }).catch(async err => {
      await console.log(err);
      await console.log(`Failed to create database ${dbName}`);
    });
  });
}

createDatabase(COUCHDB_DBNAME);
createDatabase(COUCHDB_MODEL_DBNAME);
createDatabase(COUCHDB_SALES_DBNAME);

module.exports = nano;