const express = require('express');

const router = express.Router();

/*
  Controllers
 */

const saleController = require('../../controllers/SaleController');

/*
  Routes
  */
router.get('/', saleController.index);
router.get('/:id', saleController.show);
router.post('/create', saleController.store);
//router.delete('/delete/:id', diaperController.destroy);

module.exports = router;