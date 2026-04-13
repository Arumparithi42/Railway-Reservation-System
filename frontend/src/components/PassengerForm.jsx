function PassengerForm({ onSubmit, passengerData, setPassengerData }) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <label>
        Passenger ID
        <input type="text" value={passengerData.Passenger_ID} onChange={(e) => setPassengerData({ ...passengerData, Passenger_ID: e.target.value })} required />
      </label>
      <label>
        Name
        <input type="text" value={passengerData.Name} onChange={(e) => setPassengerData({ ...passengerData, Name: e.target.value })} required />
      </label>
      <label>
        Age
        <input type="number" value={passengerData.Age} onChange={(e) => setPassengerData({ ...passengerData, Age: e.target.value })} required />
      </label>
      <label>
        Gender
        <select value={passengerData.Gender} onChange={(e) => setPassengerData({ ...passengerData, Gender: e.target.value })} required>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        Phone
        <input type="tel" value={passengerData.Phone} onChange={(e) => setPassengerData({ ...passengerData, Phone: e.target.value })} required />
      </label>
      <label>
        Email
        <input type="email" value={passengerData.Email} onChange={(e) => setPassengerData({ ...passengerData, Email: e.target.value })} required />
      </label>
      <button className="btn" type="submit">Save Passenger</button>
    </form>
  );
}

export default PassengerForm;
