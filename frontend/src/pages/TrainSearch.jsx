import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TrainCard from '../components/TrainCard';

function TrainSearch() {
  const [form, setForm] = useState({ source: '', destination: '', date: '' });
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitSearch = async (e) => {
    e.preventDefault();
    if (!form.source || !form.destination || !form.date) {
      setError('Please fill in all search fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/trains/search', { params: form });
      setTrains(response.data);
    } catch (err) {
      setError('Unable to search trains.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="card">
        <h2>Search Trains</h2>
        <form className="form" onSubmit={submitSearch}>
          <label>
            Source
            <input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} required />
          </label>
          <label>
            Destination
            <input value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} required />
          </label>
          <label>
            Departure Date
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          </label>
          <button className="btn" type="submit">Search</button>
        </form>
      </div>
      {error && <div className="alert">{error}</div>}
      {loading && <div className="card">Loading available trains...</div>}
      {trains.length > 0 && (
        <div>
          <h3>Available Schedules</h3>
          {trains.map((train) => (
            <TrainCard key={train.SCHEDULE_ID} train={train} actionLabel="Book" onAction={(item) => navigate(`/book?scheduleId=${item.SCHEDULE_ID}`)} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TrainSearch;
