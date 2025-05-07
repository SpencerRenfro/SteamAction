import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
db.init();

// API Routes

// Services Routes
app.get('/api/services', (req, res) => {
  try {
    const services = db.getAllServices();
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

app.get('/api/services/:id', (req, res) => {
  try {
    const service = db.getServiceById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

app.post('/api/services', (req, res) => {
  try {
    const { name, description, price_per_sqft, duration_minutes } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newService = db.addService({ name, description, price_per_sqft, duration_minutes });
    res.status(201).json(newService);
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ error: 'Failed to add service' });
  }
});

app.put('/api/services/:id', (req, res) => {
  try {
    const { name, description, price_per_sqft, duration_minutes } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const updatedService = db.updateService(req.params.id, { name, description, price_per_sqft, duration_minutes });
    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

app.delete('/api/services/:id', (req, res) => {
  try {
    const success = db.deleteService(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// Customers Routes
app.get('/api/customers', (req, res) => {
  try {
    const customers = db.getAllCustomers();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

app.get('/api/customers/:id', (req, res) => {
  try {
    const customer = db.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
});

app.post('/api/customers', (req, res) => {
  try {
    const { full_name, phone_number, email, address, city, zip_code } = req.body;
    if (!full_name) {
      return res.status(400).json({ error: 'Full name is required' });
    }

    const newCustomer = db.addCustomer({ full_name, phone_number, email, address, city, zip_code });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ error: 'Failed to add customer' });
  }
});

app.put('/api/customers/:id', (req, res) => {
  try {
    const { full_name, phone_number, email, address, city, zip_code } = req.body;
    if (!full_name) {
      return res.status(400).json({ error: 'Full name is required' });
    }

    const updatedCustomer = db.updateCustomer(req.params.id, { full_name, phone_number, email, address, city, zip_code });
    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Failed to update customer' });
  }
});

app.delete('/api/customers/:id', (req, res) => {
  try {
    const success = db.deleteCustomer(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

// Bookings Routes
app.get('/api/bookings', (req, res) => {
  try {
    const bookings = db.getAllBookings();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

app.get('/api/bookings/:id', (req, res) => {
  try {
    const booking = db.getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

app.post('/api/bookings', (req, res) => {
  try {
    const { customer_id, service_id, appointment_date, appointment_time, square_feet, status, notes } = req.body;
    if (!customer_id || !service_id || !appointment_date || !appointment_time) {
      return res.status(400).json({ error: 'Customer ID, Service ID, appointment date and time are required' });
    }

    const newBooking = db.addBooking({ customer_id, service_id, appointment_date, appointment_time, square_feet, status, notes });
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error adding booking:', error);
    res.status(500).json({ error: 'Failed to add booking' });
  }
});

app.put('/api/bookings/:id', (req, res) => {
  try {
    const { customer_id, service_id, appointment_date, appointment_time, square_feet, status, notes } = req.body;
    if (!customer_id || !service_id || !appointment_date || !appointment_time) {
      return res.status(400).json({ error: 'Customer ID, Service ID, appointment date and time are required' });
    }

    const updatedBooking = db.updateBooking(req.params.id, { customer_id, service_id, appointment_date, appointment_time, square_feet, status, notes });
    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

app.delete('/api/bookings/:id', (req, res) => {
  try {
    const success = db.deleteBooking(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

// Reviews Routes
app.get('/api/reviews', (req, res) => {
  try {
    const reviews = db.getAllReviews();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.get('/api/reviews/:id', (req, res) => {
  try {
    const review = db.getReviewById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ error: 'Failed to fetch review' });
  }
});

app.post('/api/reviews', (req, res) => {
  try {
    const { customer_id, rating, comment } = req.body;
    if (!customer_id || !rating) {
      return res.status(400).json({ error: 'Customer ID and rating are required' });
    }

    const newReview = db.addReview({ customer_id, rating, comment });
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

app.put('/api/reviews/:id', (req, res) => {
  try {
    const { customer_id, rating, comment } = req.body;
    if (!customer_id || !rating) {
      return res.status(400).json({ error: 'Customer ID and rating are required' });
    }

    const updatedReview = db.updateReview(req.params.id, { customer_id, rating, comment });
    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

app.delete('/api/reviews/:id', (req, res) => {
  try {
    const success = db.deleteReview(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// Service Areas Routes
app.get('/api/service-areas', (req, res) => {
  try {
    const areas = db.getAllServiceAreas();
    res.json(areas);
  } catch (error) {
    console.error('Error fetching service areas:', error);
    res.status(500).json({ error: 'Failed to fetch service areas' });
  }
});

app.get('/api/service-areas/:id', (req, res) => {
  try {
    const area = db.getServiceAreaById(req.params.id);
    if (!area) {
      return res.status(404).json({ error: 'Service area not found' });
    }
    res.json(area);
  } catch (error) {
    console.error('Error fetching service area:', error);
    res.status(500).json({ error: 'Failed to fetch service area' });
  }
});

app.post('/api/service-areas', (req, res) => {
  try {
    const { city, zip_code, coverage_radius_miles } = req.body;
    if (!city || !zip_code) {
      return res.status(400).json({ error: 'City and zip code are required' });
    }

    const newArea = db.addServiceArea({ city, zip_code, coverage_radius_miles });
    res.status(201).json(newArea);
  } catch (error) {
    console.error('Error adding service area:', error);
    res.status(500).json({ error: 'Failed to add service area' });
  }
});

app.put('/api/service-areas/:id', (req, res) => {
  try {
    const { city, zip_code, coverage_radius_miles } = req.body;
    if (!city || !zip_code) {
      return res.status(400).json({ error: 'City and zip code are required' });
    }

    const updatedArea = db.updateServiceArea(req.params.id, { city, zip_code, coverage_radius_miles });
    if (!updatedArea) {
      return res.status(404).json({ error: 'Service area not found' });
    }

    res.json(updatedArea);
  } catch (error) {
    console.error('Error updating service area:', error);
    res.status(500).json({ error: 'Failed to update service area' });
  }
});

app.delete('/api/service-areas/:id', (req, res) => {
  try {
    const success = db.deleteServiceArea(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Service area not found' });
    }

    res.json({ message: 'Service area deleted successfully' });
  } catch (error) {
    console.error('Error deleting service area:', error);
    res.status(500).json({ error: 'Failed to delete service area' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints available at:`);
  console.log(`- http://localhost:${PORT}/api/services`);
  console.log(`- http://localhost:${PORT}/api/customers`);
  console.log(`- http://localhost:${PORT}/api/bookings`);
  console.log(`- http://localhost:${PORT}/api/reviews`);
  console.log(`- http://localhost:${PORT}/api/service-areas`);
});
