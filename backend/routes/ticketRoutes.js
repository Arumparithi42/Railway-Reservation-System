const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/book', ticketController.bookTicket);
router.get('/:id', ticketController.getTicketById);
router.put('/cancel/:id', ticketController.cancelTicket);

module.exports = router;
