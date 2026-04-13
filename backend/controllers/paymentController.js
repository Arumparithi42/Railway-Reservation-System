const db = require('../config/db');

exports.createPayment = async (req, res, next) => {
  try {
    const { Payment_ID, Ticket_ID, Amount, Payment_Date, Payment_Mode } = req.body;
    if (!Payment_ID || !Ticket_ID || !Amount || !Payment_Mode) {
      return res.status(400).json({ error: 'Payment_ID, Ticket_ID, Amount, and Payment_Mode are required.' });
    }
    const paymentDate = Payment_Date || new Date().toISOString().split('T')[0];
    const query = `INSERT INTO Payment (Payment_ID, Ticket_ID, Amount, Payment_Date, Payment_Mode) VALUES (:paymentId, :ticketId, :amount, TO_DATE(:paymentDate, 'YYYY-MM-DD'), :paymentMode)`;
    await db.execute(query, {
      paymentId: Payment_ID,
      ticketId: Ticket_ID,
      amount: Amount,
      paymentDate,
      paymentMode: Payment_Mode,
    });
    res.status(201).json({ message: 'Payment recorded successfully.' });
  } catch (error) {
    next(error);
  }
};
