const express = require('express');

const router = express.Router();

/*
  Resources
 */

const diaperResource = require('./resources/DiaperResource');
const modelResource = require('./resources/ModelResource');

/*
  Routes
  */
router.use('/api/diaper', diaperResource);
router.use('/api/model', modelResource);


module.exports = router;