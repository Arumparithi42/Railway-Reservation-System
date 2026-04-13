const db = require('../config/db');

exports.getDashboard = async (req, res, next) => {
  try {
    const totalTrains = await db.execute('SELECT COUNT(*) AS COUNT FROM Train');
    const totalPassengers = await db.execute('SELECT COUNT(*) AS COUNT FROM Passenger');
    const totalBookings = await db.execute("SELECT COUNT(*) AS COUNT FROM Ticket WHERE Status = 'Booked'");
    const revenue = await db.execute('SELECT NVL(SUM(Amount), 0) AS TOTAL FROM Payment');

    res.json({
      totalTrains: totalTrains.rows[0].COUNT,
      totalPassengers: totalPassengers.rows[0].COUNT,
      totalBookings: totalBookings.rows[0].COUNT,
      revenue: revenue.rows[0].TOTAL,
    });
  } catch (error) {
    next(error);
  }
};
