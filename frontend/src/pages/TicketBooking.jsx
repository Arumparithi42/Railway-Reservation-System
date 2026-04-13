import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import PassengerForm from '../components/PassengerForm';

function TicketBooking() {
  const [searchParams] = useSearchParams();
  const scheduleId = searchParams.get('scheduleId') || '';
  const [schedule, setSchedule] = useState(null);
  const [bookingData, setBookingData] = useState({ Ticket_ID: '', Passenger_ID: '', Schedule_ID: scheduleId, Class: 'Sleeper' });
  const [passengerData, setPassengerData] = useState({ Passenger_ID: '', Name: '', Age: '', Gender: '', Phone: '', Email: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadSchedule() {
      if (!scheduleId) return;
      try {
        const result = await api.get(`/schedule/${scheduleId}`);
        setSchedule(result.data[0] || null);
      } catch (err) {
        setError('Unable to load schedule details.');
      }
    }
    loadSchedule();
  }, [scheduleId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookingData.Ticket_ID) {
      setError('Ticket ID is required.');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const passengerId = passengerData.Passenger_ID || `P${Date.now()}`;
      await api.post('/passengers', { ...passengerData, Passenger_ID: passengerId });
      const ticketPayload = {
        ...bookingData,
        Passenger_ID: passengerId,
        Schedule_ID: scheduleId,
      };
      await api.post('/tickets/book', ticketPayload);
      setMessage(`Booked successfully with Ticket ID ${bookingData.Ticket_ID}.`);
      navigate(`/ticket/${bookingData.Ticket_ID}`);
    } catch (err) {
      setError('Failed to book ticket.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="card">
        <h2>Ticket Booking</h2>
        {scheduleId ? <p>Booking schedule ID {scheduleId}</p> : <p>Select a schedule from search first.</p>}
      </div>
      {error && <div className="alert">{error}</div>}
      {message && <div className="alert">{message}</div>}
      <div className="card">
        <PassengerForm onSubmit={(e) => e.preventDefault()} passengerData={passengerData} setPassengerData={setPassengerData} />
      </div>
      <div className="card">
        <form className="form" onSubmit={handleBooking}>
          <label>
            Ticket ID
            <input value={bookingData.Ticket_ID} onChange={(e) => setBookingData({ ...bookingData, Ticket_ID: e.target.value })} required />
          </label>
          <label>
            Class
            <select value={bookingData.Class} onChange={(e) => setBookingData({ ...bookingData, Class: e.target.value })}>
              <option value="Sleeper">Sleeper</option>
              <option value="AC">AC</option>
              <option value="General">General</option>
            </select>
          </label>
          <button className="btn" type="submit" disabled={loading || !scheduleId}>{loading ? 'Booking...' : 'Book Ticket'}</button>
        </form>
      </div>
    </div>
  );
}

export default TicketBooking;
