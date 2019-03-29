const express = require('express');

const router = express.Router();

/*
  Resources
 */

const diaperResource = require('./resources/DiaperResource');
const modelResource = require('./resources/ModelResource');
const saleResource = require('./resources/SaleResource');

/*
  Routes
  */
router.use('/api/diaper', diaperResource);
router.use('/api/model', modelResource);
router.use('/api/sale', saleResource);


module.exports = router;