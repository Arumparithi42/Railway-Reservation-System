const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/passengerController');

router.post('/', passengerController.createPassenger);
router.get('/', passengerController.getPassengers);
router.get('/:id', passengerController.getPassengerById);
router.put('/:id', passengerController.updatePassenger);
router.delete('/:id', passengerController.deletePassenger);

module.exports = router;
