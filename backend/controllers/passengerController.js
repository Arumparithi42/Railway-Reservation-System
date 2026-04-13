const db = require('../config/db');

exports.createPassenger = async (req, res, next) => {
  try {
    const { Passenger_ID, Name, Age, Gender, Phone, Email } = req.body;
    if (!Passenger_ID || !Name) {
      return res.status(400).json({ error: 'Passenger ID and Name are required.' });
    }
    const query = `INSERT INTO Passenger (Passenger_ID, Name, Age, Gender, Phone, Email) VALUES (:id, :name, :age, :gender, :phone, :email)`;
    await db.execute(query, {
      id: Passenger_ID,
      name: Name,
      age: Age,
      gender: Gender,
      phone: Phone,
      email: Email,
    });
    res.status(201).json({ message: 'Passenger created successfully.' });
  } catch (error) {
    next(error);
  }
};

exports.getPassengers = async (req, res, next) => {
  try {
    const result = await db.execute('SELECT * FROM Passenger ORDER BY Passenger_ID');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

exports.getPassengerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.execute('SELECT * FROM Passenger WHERE Passenger_ID = :id', { id });
    if (!result.rows.length) {
      return res.status(404).json({ error: 'Passenger not found.' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.updatePassenger = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { Name, Age, Gender, Phone, Email } = req.body;
    await db.execute(
      `UPDATE Passenger SET Name = :name, Age = :age, Gender = :gender, Phone = :phone, Email = :email WHERE Passenger_ID = :id`,
      {
        name: Name,
        age: Age,
        gender: Gender,
        phone: Phone,
        email: Email,
        id,
      }
    );
    res.json({ message: 'Passenger updated successfully.' });
  } catch (error) {
    next(error);
  }
};

exports.deletePassenger = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.execute('DELETE FROM Passenger WHERE Passenger_ID = :id', { id });
    res.json({ message: 'Passenger deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
