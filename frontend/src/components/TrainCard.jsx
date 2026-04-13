function TrainCard({ train, actionLabel, onAction }) {
  return (
    <div className="card train-card">
      <div>
        <h3>{train.Train_Name || train.TRAIN_NAME}</h3>
        <p>{train.Source || train.SOURCE} → {train.Destination || train.DESTINATION}</p>
        <p>Departure: {train.Departure_Time || train.DEPARTURE_TIME} {train.Departure_Date || train.DEPARTURE_DATE}</p>
        <p>Arrival: {train.Arrival_Time || train.ARRIVAL_TIME}</p>
        <p>Seats: {train.Total_Seats || train.TOTAL_SEATS}</p>
      </div>
      {actionLabel && (
        <button className="btn" onClick={() => onAction(train)}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default TrainCard;
