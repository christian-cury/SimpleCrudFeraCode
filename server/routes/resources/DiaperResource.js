const express = require('express');

const router = express.Router();

/*
  Controllers
 */

const diaperController = require('../../controllers/DiaperController');

/*
  Routes
  */
router.get('/', diaperController.index);
router.get('/:id', diaperController.show);
router.post('/create', diaperController.store);
router.put('/edit/:id', diaperController.update);
router.delete('/deactivate/:id', diaperController.deactivate);
router.put('/activate/:id', diaperController.activate);
router.delete('/delete/:id', diaperController.destroy);

module.exports = router;