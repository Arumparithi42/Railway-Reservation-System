const db = require('../config/db');

exports.createStation = async (req, res, next) => {
  try {
    const { Station_ID, Station_Name, City, State } = req.body;
    if (!Station_ID || !Station_Name || !City || !State) {
      return res.status(400).json({ error: 'All station fields are required.' });
    }
    const query = `INSERT INTO Station (Station_ID, Station_Name, City, State) VALUES (:id, :name, :city, :state)`;
    await db.execute(query, {
      id: Station_ID,
      name: Station_Name,
      city: City,
      state: State,
    });
    res.status(201).json({ message: 'Station added successfully.' });
  } catch (error) {
    next(error);
  }
};

exports.getStations = async (req, res, next) => {
  try {
    const result = await db.execute('SELECT * FROM Station ORDER BY Station_ID');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
