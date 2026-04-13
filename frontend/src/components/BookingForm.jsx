function BookingForm({ onSubmit, bookingData, setBookingData, schedules }) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <label>
        Schedule ID
        <select value={bookingData.Schedule_ID} onChange={(e) => setBookingData({ ...bookingData, Schedule_ID: e.target.value })} required>
          <option value="">Select schedule</option>
          {schedules.map((schedule) => (
            <option key={schedule.SCHEDULE_ID || schedule.Schedule_ID} value={schedule.SCHEDULE_ID || schedule.Schedule_ID}>
              {schedule.Train_Name || schedule.TRAIN_NAME} - {schedule.DEPARTURE_DATE || schedule.Departure_Date}
            </option>
          ))}
        </select>
      </label>
      <label>
        Class
        <select value={bookingData.Class} onChange={(e) => setBookingData({ ...bookingData, Class: e.target.value })} required>
          <option value="">Choose class</option>
          <option value="Sleeper">Sleeper</option>
          <option value="AC">AC</option>
          <option value="General">General</option>
        </select>
      </label>
      <label>
        Ticket ID
        <input type="text" value={bookingData.Ticket_ID} onChange={(e) => setBookingData({ ...bookingData, Ticket_ID: e.target.value })} required />
      </label>
      <button className="btn" type="submit">Book Ticket</button>
    </form>
  );
}

export default BookingForm;
