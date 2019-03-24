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
router.use('/diaper', diaperResource);
router.use('/model', modelResource);


module.exports = router;