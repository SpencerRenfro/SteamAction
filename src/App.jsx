import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ServiceList from "./components/ServiceList";
import ServiceAreas from "./components/ServiceAreas";
import CarpetCalculator from "./components/CarpetCalculator";
import FAQ from "./components/Faq";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServiceList />} />
            {/* <Route path="/bookings" element={<Bookings />} /> */}
            {/* <Route path="/customers" element={<Customers />} /> */}
            {/* <Route path="/reviews" element={<Reviews />} /> */}
            <Route path="/service-areas" element={<ServiceAreas />} />
            <Route path="/calculator" element={<CarpetCalculator />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
