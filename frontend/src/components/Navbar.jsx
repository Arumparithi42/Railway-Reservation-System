import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">Railway Reservation</div>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/trains">Trains</NavLink>
        <NavLink to="/schedules">Schedules</NavLink>
        <NavLink to="/admin">Dashboard</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
