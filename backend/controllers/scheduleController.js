const db = require('../config/db');

exports.createSchedule = async (req, res, next) => {
  try {
    const { Schedule_ID, Train_No, Departure_Date, Departure_Time, Arrival_Time } = req.body;
    if (!Schedule_ID || !Train_No || !Departure_Date || !Departure_Time || !Arrival_Time) {
      return res.status(400).json({ error: 'All schedule fields are required.' });
    }
    const query = `INSERT INTO Schedule (Schedule_ID, Train_No, Departure_Date, Departure_Time, Arrival_Time) VALUES (:id, :trainNo, TO_DATE(:departureDate, 'YYYY-MM-DD'), :departureTime, :arrivalTime)`;
    await db.execute(query, {
      id: Schedule_ID,
      trainNo: Train_No,
      departureDate: Departure_Date,
      departureTime: Departure_Time,
      arrivalTime: Arrival_Time,
    });
    res.status(201).json({ message: 'Schedule added successfully.' });
  } catch (error) {
    next(error);
  }
};

exports.getSchedules = async (req, res, next) => {
  try {
    const query = `SELECT s.Schedule_ID, s.Train_No, t.Train_Name, TO_CHAR(s.Departure_Date, 'YYYY-MM-DD') AS Departure_Date, s.Departure_Time, s.Arrival_Time
      FROM Schedule s
      JOIN Train t ON s.Train_No = t.Train_No
      ORDER BY s.Departure_Date, s.Departure_Time`;
    const result = await db.execute(query);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

exports.getScheduleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = `SELECT s.Schedule_ID, s.Train_No, t.Train_Name, TO_CHAR(s.Departure_Date, 'YYYY-MM-DD') AS Departure_Date, s.Departure_Time, s.Arrival_Time
      FROM Schedule s
      JOIN Train t ON s.Train_No = t.Train_No
      WHERE s.Schedule_ID = :id`;
    const result = await db.execute(query, { id });
    if (!result.rows.length) {
      return res.status(404).json({ error: 'Schedule not found.' });
    }
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

exports.getSchedulesByTrain = async (req, res, next) => {
  try {
    const { trainNo } = req.params;
    const query = `SELECT Schedule_ID, Train_No, TO_CHAR(Departure_Date, 'YYYY-MM-DD') AS Departure_Date, Departure_Time, Arrival_Time FROM Schedule WHERE Train_No = :trainNo ORDER BY Departure_Date`;
    const result = await db.execute(query, { trainNo });
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
