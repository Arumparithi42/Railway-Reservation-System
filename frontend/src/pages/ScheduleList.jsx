import { useEffect, useState } from 'react';
import api from '../services/api';

function ScheduleList() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const response = await api.get('/schedule');
        setSchedules(response.data);
      } catch (err) {
        setError('Unable to load schedules.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <div className="card">
        <h2>Train Schedule</h2>
      </div>
      {error && <div className="alert">{error}</div>}
      {loading && <div className="card">Loading schedules...</div>}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Schedule ID</th>
              <th>Train</th>
              <th>Departure Date</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.SCHEDULE_ID}>
                <td>{schedule.SCHEDULE_ID}</td>
                <td>{schedule.TRAIN_NAME}</td>
                <td>{schedule.DEPARTURE_DATE}</td>
                <td>{schedule.DEPARTURE_TIME}</td>
                <td>{schedule.ARRIVAL_TIME}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScheduleList;
