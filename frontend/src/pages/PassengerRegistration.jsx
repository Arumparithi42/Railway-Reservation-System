import { useState } from 'react';
import api from '../services/api';
import PassengerForm from '../components/PassengerForm';

function PassengerRegistration() {
  const [passengerData, setPassengerData] = useState({ Passenger_ID: '', Name: '', Age: '', Gender: '', Phone: '', Email: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/passengers', passengerData);
      setMessage('Passenger registered successfully.');
      setError('');
      setPassengerData({ Passenger_ID: '', Name: '', Age: '', Gender: '', Phone: '', Email: '' });
    } catch (err) {
      setError('Unable to register passenger.');
      setMessage('');
    }
  };

  return (
    <div>
      <div className="card">
        <h2>Passenger Registration</h2>
        {message && <div className="alert">{message}</div>}
        {error && <div className="alert">{error}</div>}
        <PassengerForm onSubmit={handleSubmit} passengerData={passengerData} setPassengerData={setPassengerData} />
      </div>
    </div>
  );
}

export default PassengerRegistration;
