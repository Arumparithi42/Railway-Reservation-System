const db = require('../config/db');

exports.createTrain = async (req, res, next) => {
  try {
    const { Train_No, Train_Name, Source, Destination, Total_Seats } = req.body;
    if (!Train_No || !Train_Name || !Source || !Destination || !Total_Seats) {
      return res.status(400).json({ error: 'All train fields are required.' });
    }
    const query = `INSERT INTO Train (Train_No, Train_Name, Source, Destination, Total_Seats) VALUES (:no, :name, :source, :destination, :seats)`;
    await db.execute(query, {
      no: Train_No,
      name: Train_Name,
      source: Source,
      destination: Destination,
      seats: Total_Seats,
    });
    res.status(201).json({ message: 'Train added successfully.' });
  } catch (error) {
    next(error);
  }
};

exports.getTrains = async (req, res, next) => {
  try {
    const result = await db.execute('SELECT * FROM Train ORDER BY Train_No');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

exports.getTrainById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.execute('SELECT * FROM Train WHERE Train_No = :id', { id });
    if (!result.rows.length) {
      return res.status(404).json({ error: 'Train not found.' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.updateTrain = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { Train_Name, Source, Destination, Total_Seats } = req.body;
    await db.execute(
      `UPDATE Train SET Train_Name = :name, Source = :source, Destination = :destination, Total_Seats = :seats WHERE Train_No = :id`,
      {
        name: Train_Name,
        source: Source,
        destination: Destination,
        seats: Total_Seats,
        id,
      }
    );
    res.json({ message: 'Train updated successfully.' });
  } catch (error) {
    next(error);
  }
};

exports.deleteTrain = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.execute('DELETE FROM Train WHERE Train_No = :id', { id });
    res.json({ message: 'Train deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

exports.searchTrains = async (req, res, next) => {
  try {
    const { source, destination, date } = req.query;
    const query = `SELECT s.Schedule_ID, t.Train_No, t.Train_Name, t.Source, t.Destination, t.Total_Seats, s.Departure_Date, s.Departure_Time, s.Arrival_Time
      FROM Schedule s
      JOIN Train t ON s.Train_No = t.Train_No
      WHERE LOWER(t.Source) = LOWER(:source)
      AND LOWER(t.Destination) = LOWER(:destination)
      AND s.Departure_Date = TO_DATE(:departureDate, 'YYYY-MM-DD')
      ORDER BY s.Departure_Time`;
    const result = await db.execute(query, {
      source,
      destination,
      departureDate: date,
    });
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
