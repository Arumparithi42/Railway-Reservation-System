import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import TicketCard from '../components/TicketCard';

function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTicket() {
      setLoading(true);
      try {
        const response = await api.get(`/tickets/${id}`);
        setTicket(response.data);
      } catch (err) {
        setError('Unable to load ticket details.');
      } finally {
        setLoading(false);
      }
    }
    loadTicket();
  }, [id]);

  return (
    <div>
      <div className="card">
        <h2>Ticket Details</h2>
      </div>
      {error && <div className="alert">{error}</div>}
      {loading && <div className="card">Loading ticket...</div>}
      {ticket && (
        <div>
          <TicketCard ticket={ticket} />
          <div className="card">
            <p>Train: {ticket.TRAIN_NAME}</p>
            <p>Departure: {ticket.DEPARTURE_DATE} {ticket.DEPARTURE_TIME}</p>
            <p>Arrival: {ticket.ARRIVAL_TIME}</p>
            <p>Booking Date: {ticket.BOOKING_DATE}</p>
            <Link className="btn" to="/payment">Pay Now</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketDetails;
