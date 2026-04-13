const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.post('/', scheduleController.createSchedule);
router.get('/', scheduleController.getSchedules);
router.get('/train/:trainNo', scheduleController.getSchedulesByTrain);
router.get('/:id', scheduleController.getScheduleById);

module.exports = router;
