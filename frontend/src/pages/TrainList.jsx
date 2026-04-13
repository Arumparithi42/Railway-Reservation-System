import { useEffect, useState } from 'react';
import api from '../services/api';
import TrainCard from '../components/TrainCard';

function TrainList() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTrains() {
      setLoading(true);
      try {
        const response = await api.get('/trains');
        setTrains(response.data);
      } catch (err) {
        setError('Unable to fetch trains.');
      } finally {
        setLoading(false);
      }
    }
    fetchTrains();
  }, []);

  return (
    <div>
      <div className="card">
        <h2>Train List</h2>
      </div>
      {error && <div className="alert">{error}</div>}
      {loading && <div className="card">Loading trains...</div>}
      {trains.map((train) => (
        <TrainCard key={train.TRAIN_NO} train={train} />
      ))}
    </div>
  );
}

export default TrainList;
