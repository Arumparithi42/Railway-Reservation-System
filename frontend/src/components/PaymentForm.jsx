function PaymentForm({ onSubmit, paymentData, setPaymentData }) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <label>
        Payment ID
        <input type="text" value={paymentData.Payment_ID} onChange={(e) => setPaymentData({ ...paymentData, Payment_ID: e.target.value })} required />
      </label>
      <label>
        Ticket ID
        <input type="text" value={paymentData.Ticket_ID} onChange={(e) => setPaymentData({ ...paymentData, Ticket_ID: e.target.value })} required />
      </label>
      <label>
        Amount
        <input type="number" value={paymentData.Amount} onChange={(e) => setPaymentData({ ...paymentData, Amount: e.target.value })} required />
      </label>
      <label>
        Payment Mode
        <select value={paymentData.Payment_Mode} onChange={(e) => setPaymentData({ ...paymentData, Payment_Mode: e.target.value })} required>
          <option value="">Select mode</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="NetBanking">NetBanking</option>
        </select>
      </label>
      <button className="btn" type="submit">Record Payment</button>
    </form>
  );
}

export default PaymentForm;
