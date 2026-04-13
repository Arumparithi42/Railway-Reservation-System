import { useState } from 'react';
import api from '../services/api';
import PaymentForm from '../components/PaymentForm';

function PaymentPage() {
  const [paymentData, setPaymentData] = useState({ Payment_ID: '', Ticket_ID: '', Amount: '', Payment_Mode: 'UPI' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/payments', paymentData);
      setMessage('Payment recorded successfully.');
      setError('');
      setPaymentData({ Payment_ID: '', Ticket_ID: '', Amount: '', Payment_Mode: 'UPI' });
    } catch (err) {
      setError('Unable to complete payment.');
      setMessage('');
    }
  };

  return (
    <div>
      <div className="card">
        <h2>Payment</h2>
      </div>
      {message && <div className="alert">{message}</div>}
      {error && <div className="alert">{error}</div>}
      <PaymentForm onSubmit={handleSubmit} paymentData={paymentData} setPaymentData={setPaymentData} />
    </div>
  );
}

export default PaymentPage;
