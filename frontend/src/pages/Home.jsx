import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="card">
        <h1>Railway Reservation System</h1>
        <p>Search trains, book tickets, manage passengers, and complete payments in a clean dashboard experience.</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link className="btn" to="/search">Search Trains</Link>
          <Link className="btn" to="/book">Book Ticket</Link>
          <Link className="btn" to="/admin">Admin Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
