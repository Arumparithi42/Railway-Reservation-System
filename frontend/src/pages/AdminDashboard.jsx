import { useEffect, useState } from 'react';
import api from '../services/api';

function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMetrics() {
      setLoading(true);
      try {
        const response = await api.get('/dashboard');
        setMetrics(response.data);
      } catch (err) {
        setError('Unable to load dashboard metrics.');
      } finally {
        setLoading(false);
      }
    }
    loadMetrics();
  }, []);

  return (
    <div>
      <div className="card">
        <h2>Admin Dashboard</h2>
      </div>
      {error && <div className="alert">{error}</div>}
      {loading && <div className="card">Loading dashboard...</div>}
      {metrics && (
        <div className="table-wrapper">
          <table>
            <tbody>
              <tr>
                <th>Total Trains</th>
                <td>{metrics.totalTrains}</td>
              </tr>
              <tr>
                <th>Total Passengers</th>
                <td>{metrics.totalPassengers}</td>
              </tr>
              <tr>
                <th>Total Bookings</th>
                <td>{metrics.totalBookings}</td>
              </tr>
              <tr>
                <th>Revenue</th>
                <td>{metrics.revenue}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
