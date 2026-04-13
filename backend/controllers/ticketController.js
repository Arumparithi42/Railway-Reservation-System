const db = require('../config/db');

exports.bookTicket = async (req, res, next) => {
  try {
    const { Ticket_ID, Passenger_ID, Schedule_ID, Seat_No, Class, Booking_Date, Status } = req.body;
    if (!Ticket_ID || !Passenger_ID || !Schedule_ID || !Class) {
      return res.status(400).json({ error: 'Ticket_ID, Passenger_ID, Schedule_ID and Class are required.' });
    }
    const seatQuery = `SELECT MAX(Total_Seats) AS MAX_SEATS FROM Train t JOIN Schedule s ON t.Train_No = s.Train_No WHERE s.Schedule_ID = :scheduleId`;
    const seatsResult = await db.execute(seatQuery, { scheduleId: Schedule_ID });
    const maxSeats = seatsResult.rows[0]?.MAX_SEATS || 0;
    const countQuery = `SELECT COUNT(*) AS BOOKED FROM Ticket WHERE Schedule_ID = :scheduleId AND Status = 'Booked'`;
    const bookedResult = await db.execute(countQuery, { scheduleId: Schedule_ID });
    const bookedSeats = bookedResult.rows[0]?.BOOKED || 0;
    if (bookedSeats >= maxSeats) {
      return res.status(400).json({ error: 'No seats available for selected schedule.' });
    }
    const assignedSeat = Seat_No || bookedSeats + 1;
    const bookingDate = Booking_Date || new Date().toISOString().split('T')[0];
    const status = Status || 'Booked';
    const query = `INSERT INTO Ticket (Ticket_ID, Passenger_ID, Schedule_ID, Seat_No, Class, Booking_Date, Status) VALUES (:ticketId, :passengerId, :scheduleId, :seatNo, :class, TO_DATE(:bookingDate, 'YYYY-MM-DD'), :status)`;
    await db.execute(query, {
      ticketId: Ticket_ID,
      passengerId: Passenger_ID,
      scheduleId: Schedule_ID,
      seatNo: assignedSeat,
      class: Class,
      bookingDate,
      status,
    });
    res.status(201).json({ message: 'Ticket booked successfully.', Ticket_ID });
  } catch (error) {
    next(error);
  }
};

exports.getTicketById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = `SELECT t.Ticket_ID, t.Passenger_ID, p.Name AS Passenger_Name, t.Schedule_ID, s.Train_No, tr.Train_Name, TO_CHAR(t.Booking_Date, 'YYYY-MM-DD') AS Booking_Date, t.Seat_No, t.Class, t.Status, s.Departure_Date, s.Departure_Time, s.Arrival_Time
      FROM Ticket t
      JOIN Passenger p ON t.Passenger_ID = p.Passenger_ID
      JOIN Schedule s ON t.Schedule_ID = s.Schedule_ID
      JOIN Train tr ON s.Train_No = tr.Train_No
      WHERE t.Ticket_ID = :id`;
    const result = await db.execute(query, { id });
    if (!result.rows.length) {
      return res.status(404).json({ error: 'Ticket not found.' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

exports.cancelTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.execute(`UPDATE Ticket SET Status = 'Cancelled' WHERE Ticket_ID = :id`, { id });
    res.json({ message: 'Ticket cancelled successfully.' });
  } catch (error) {
    next(error);
  }
};
