import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TrainSearch from './pages/TrainSearch';
import PassengerRegistration from './pages/PassengerRegistration';
import TrainList from './pages/TrainList';
import ScheduleList from './pages/ScheduleList';
import TicketBooking from './pages/TicketBooking';
import TicketDetails from './pages/TicketDetails';
import PaymentPage from './pages/PaymentPage';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<TrainSearch />} />
          <Route path="/passengers" element={<PassengerRegistration />} />
          <Route path="/trains" element={<TrainList />} />
          <Route path="/schedules" element={<ScheduleList />} />
          <Route path="/book" element={<TicketBooking />} />
          <Route path="/ticket/:id" element={<TicketDetails />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
