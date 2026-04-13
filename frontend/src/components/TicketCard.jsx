function TicketCard({ ticket }) {
  return (
    <div className="card ticket-card">
      <h3>Ticket {ticket.Ticket_ID}</h3>
      <p>Passenger: {ticket.PASSENGER_NAME || ticket.Passenger_Name}</p>
      <p>Train: {ticket.TRAIN_NAME || ticket.Train_Name}</p>
      <p>Seat: {ticket.Seat_No}</p>
      <p>Class: {ticket.Class}</p>
      <p>Status: {ticket.Status}</p>
    </div>
  );
}

export default TicketCard;
