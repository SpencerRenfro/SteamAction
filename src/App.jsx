import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ServiceList from "./components/ServiceList";
import Bookings from "./components/Bookings";
import Customers from "./components/Customers";
import Reviews from "./components/Reviews";
import ServiceAreas from "./components/ServiceAreas";
import CarpetCalculator from "./components/CarpetCalculator";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/calculator" element={<CarpetCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
