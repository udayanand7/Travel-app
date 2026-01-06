import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TripsListing from './pages/TripsListing';
import TripDetails from './pages/TripDetails';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import TicketPage from './pages/TicketPage';
import SeedFirestore from './components/SeedFirestore';

function App() {
  const [bookingData, setBookingData] = useState(null);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/seed" element={<SeedFirestore />} />
            <Route path="/trips" element={<TripsListing />} />
            <Route path="/trip/:id" element={<TripDetails />} />
            <Route path="/book/:id" element={<BookingPage setBookingData={setBookingData} />} />
            <Route path="/payment" element={<PaymentPage bookingData={bookingData} setBookingData={setBookingData} />} />
            <Route path="/ticket" element={<TicketPage bookingData={bookingData} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
