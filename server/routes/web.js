const express = require('express');

const router = express.Router();

/*
  Resources
 */

const diaperResource = require('./resources/DiaperResource');

/*
  Routes
  */
router.use('/diaper', diaperResource);



module.exports = router;