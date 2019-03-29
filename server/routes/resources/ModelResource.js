const express = require('express');

const router = express.Router();

/*
  Controllers
 */

const modelController = require('../../controllers/ModelController');

/*
  Routes
  */
router.get('/', modelController.index);
router.post('/create', modelController.store);
router.delete('/delete/:id', modelController.destroy);

module.exports = router;