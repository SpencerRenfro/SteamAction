import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Database file path
const dbPath = path.join(dataDir, 'database.sqlite');

// Initialize database connection
let db;

function init() {
  try {
    db = new Database(dbPath);

    // Create tables if they don't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS Services (
        service_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price_per_sqft DECIMAL(5, 2),
        duration_minutes INTEGER
      );

      CREATE TABLE IF NOT EXISTS Customers (
        customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        phone_number TEXT,
        email TEXT,
        address TEXT,
        city TEXT,
        zip_code TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS Bookings (
        booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER,
        service_id INTEGER,
        appointment_date DATE,
        appointment_time TIME,
        square_feet INTEGER,
        status TEXT DEFAULT 'Scheduled',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
        FOREIGN KEY (service_id) REFERENCES Services(service_id)
      );

      CREATE TABLE IF NOT EXISTS Reviews (
        review_id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER,
        rating INTEGER CHECK (rating BETWEEN 1 AND 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
      );

      CREATE TABLE IF NOT EXISTS ServiceAreas (
        area_id INTEGER PRIMARY KEY AUTOINCREMENT,
        city TEXT,
        zip_code TEXT,
        coverage_radius_miles INTEGER
      );
    `);

    // Check if we have any data, if not, add some sample data
    const servicesCount = db.prepare('SELECT COUNT(*) as count FROM Services').get();

    if (servicesCount.count === 0) {
      // Add sample services
      const insertService = db.prepare('INSERT INTO Services (name, description, price_per_sqft, duration_minutes) VALUES (?, ?, ?, ?)');

      insertService.run('Basic Cleaning', 'Standard cleaning service for homes', 0.50, 60);
      insertService.run('Deep Cleaning', 'Thorough cleaning including hard-to-reach areas', 0.75, 120);
      insertService.run('Move-in/Move-out Cleaning', 'Complete cleaning for new or vacated properties', 0.90, 180);
      insertService.run('Window Cleaning', 'Interior and exterior window cleaning', 0.40, 45);
      insertService.run('Carpet Cleaning', 'Deep carpet cleaning and stain removal', 0.60, 90);

      console.log('Sample services added to the database');

      // Add sample customers
      const insertCustomer = db.prepare('INSERT INTO Customers (full_name, phone_number, email, address, city, zip_code) VALUES (?, ?, ?, ?, ?, ?)');

      insertCustomer.run('John Doe', '555-123-4567', 'john.doe@example.com', '123 Main St', 'Seattle', '98101');
      insertCustomer.run('Jane Smith', '555-987-6543', 'jane.smith@example.com', '456 Oak Ave', 'Bellevue', '98004');
      insertCustomer.run('Robert Johnson', '555-456-7890', 'robert.j@example.com', '789 Pine Rd', 'Redmond', '98052');
      insertCustomer.run('Sarah Williams', '555-789-0123', 'sarah.w@example.com', '321 Cedar Blvd', 'Kirkland', '98033');
      insertCustomer.run('Michael Brown', '555-234-5678', 'michael.b@example.com', '654 Maple Dr', 'Renton', '98055');

      console.log('Sample customers added to the database');

      // Add sample bookings
      const insertBooking = db.prepare('INSERT INTO Bookings (customer_id, service_id, appointment_date, appointment_time, square_feet, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?)');

      insertBooking.run(1, 1, '2024-10-15', '09:00:00', 1200, 'Scheduled', 'Please bring eco-friendly products');
      insertBooking.run(2, 3, '2024-10-16', '13:30:00', 1800, 'Scheduled', 'New construction, needs thorough cleaning');
      insertBooking.run(3, 2, '2024-10-17', '10:00:00', 1500, 'Scheduled', 'Has pets, please be careful with the door');
      insertBooking.run(4, 4, '2024-10-18', '14:00:00', 1000, 'Scheduled', 'Focus on exterior windows');
      insertBooking.run(5, 5, '2024-10-19', '11:00:00', 2000, 'Scheduled', 'Several stains in living room carpet');

      console.log('Sample bookings added to the database');

      // Add sample reviews
      const insertReview = db.prepare('INSERT INTO Reviews (customer_id, rating, comment) VALUES (?, ?, ?)');

      insertReview.run(1, 5, 'Excellent service! My home has never been cleaner.');
      insertReview.run(2, 4, 'Great job on the move-out cleaning. Saved me a lot of time.');
      insertReview.run(3, 5, 'Very thorough and professional. Will use again.');
      insertReview.run(4, 3, 'Good window cleaning, but missed a few spots.');
      insertReview.run(5, 5, 'Amazing results on my carpets! All stains removed.');

      console.log('Sample reviews added to the database');

      // Add sample service areas
      const insertArea = db.prepare('INSERT INTO ServiceAreas (city, zip_code, coverage_radius_miles) VALUES (?, ?, ?)');

      insertArea.run('Seattle', '98101', 15);
      insertArea.run('Bellevue', '98004', 10);
      insertArea.run('Redmond', '98052', 12);
      insertArea.run('Kirkland', '98033', 8);
      insertArea.run('Renton', '98055', 10);

      console.log('Sample service areas added to the database');
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Services functions
function getAllServices() {
  return db.prepare('SELECT * FROM Services ORDER BY service_id').all();
}

function getServiceById(id) {
  return db.prepare('SELECT * FROM Services WHERE service_id = ?').get(id);
}

function addService({ name, description, price_per_sqft, duration_minutes }) {
  const stmt = db.prepare('INSERT INTO Services (name, description, price_per_sqft, duration_minutes) VALUES (?, ?, ?, ?)');
  const info = stmt.run(name, description || null, price_per_sqft, duration_minutes);

  return getServiceById(info.lastInsertRowid);
}

function updateService(id, { name, description, price_per_sqft, duration_minutes }) {
  const stmt = db.prepare('UPDATE Services SET name = ?, description = ?, price_per_sqft = ?, duration_minutes = ? WHERE service_id = ?');
  const info = stmt.run(name, description || null, price_per_sqft, duration_minutes, id);

  if (info.changes === 0) {
    return null;
  }

  return getServiceById(id);
}

function deleteService(id) {
  const stmt = db.prepare('DELETE FROM Services WHERE service_id = ?');
  const info = stmt.run(id);

  return info.changes > 0;
}

// Customers functions
function getAllCustomers() {
  return db.prepare('SELECT * FROM Customers ORDER BY customer_id').all();
}

function getCustomerById(id) {
  return db.prepare('SELECT * FROM Customers WHERE customer_id = ?').get(id);
}

function addCustomer({ full_name, phone_number, email, address, city, zip_code }) {
  const stmt = db.prepare('INSERT INTO Customers (full_name, phone_number, email, address, city, zip_code) VALUES (?, ?, ?, ?, ?, ?)');
  const info = stmt.run(full_name, phone_number || null, email || null, address || null, city || null, zip_code || null);

  return getCustomerById(info.lastInsertRowid);
}

function updateCustomer(id, { full_name, phone_number, email, address, city, zip_code }) {
  const stmt = db.prepare('UPDATE Customers SET full_name = ?, phone_number = ?, email = ?, address = ?, city = ?, zip_code = ? WHERE customer_id = ?');
  const info = stmt.run(full_name, phone_number || null, email || null, address || null, city || null, zip_code || null, id);

  if (info.changes === 0) {
    return null;
  }

  return getCustomerById(id);
}

function deleteCustomer(id) {
  const stmt = db.prepare('DELETE FROM Customers WHERE customer_id = ?');
  const info = stmt.run(id);

  return info.changes > 0;
}

// Bookings functions
function getAllBookings() {
  return db.prepare(`
    SELECT b.*, c.full_name as customer_name, s.name as service_name
    FROM Bookings b
    JOIN Customers c ON b.customer_id = c.customer_id
    JOIN Services s ON b.service_id = s.service_id
    ORDER BY b.appointment_date, b.appointment_time
  `).all();
}

function getBookingById(id) {
  return db.prepare(`
    SELECT b.*, c.full_name as customer_name, s.name as service_name
    FROM Bookings b
    JOIN Customers c ON b.customer_id = c.customer_id
    JOIN Services s ON b.service_id = s.service_id
    WHERE b.booking_id = ?
  `).get(id);
}

function addBooking({ customer_id, service_id, appointment_date, appointment_time, square_feet, status, notes }) {
  const stmt = db.prepare('INSERT INTO Bookings (customer_id, service_id, appointment_date, appointment_time, square_feet, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const info = stmt.run(customer_id, service_id, appointment_date, appointment_time, square_feet, status || 'Scheduled', notes || null);

  return getBookingById(info.lastInsertRowid);
}

function updateBooking(id, { customer_id, service_id, appointment_date, appointment_time, square_feet, status, notes }) {
  const stmt = db.prepare('UPDATE Bookings SET customer_id = ?, service_id = ?, appointment_date = ?, appointment_time = ?, square_feet = ?, status = ?, notes = ? WHERE booking_id = ?');
  const info = stmt.run(customer_id, service_id, appointment_date, appointment_time, square_feet, status || 'Scheduled', notes || null, id);

  if (info.changes === 0) {
    return null;
  }

  return getBookingById(id);
}

function deleteBooking(id) {
  const stmt = db.prepare('DELETE FROM Bookings WHERE booking_id = ?');
  const info = stmt.run(id);

  return info.changes > 0;
}

// Reviews functions
function getAllReviews() {
  return db.prepare(`
    SELECT r.*, c.full_name as customer_name
    FROM Reviews r
    JOIN Customers c ON r.customer_id = c.customer_id
    ORDER BY r.created_at DESC
  `).all();
}

function getReviewById(id) {
  return db.prepare(`
    SELECT r.*, c.full_name as customer_name
    FROM Reviews r
    JOIN Customers c ON r.customer_id = c.customer_id
    WHERE r.review_id = ?
  `).get(id);
}

function addReview({ customer_id, rating, comment }) {
  const stmt = db.prepare('INSERT INTO Reviews (customer_id, rating, comment) VALUES (?, ?, ?)');
  const info = stmt.run(customer_id, rating, comment || null);

  return getReviewById(info.lastInsertRowid);
}

function updateReview(id, { customer_id, rating, comment }) {
  const stmt = db.prepare('UPDATE Reviews SET customer_id = ?, rating = ?, comment = ? WHERE review_id = ?');
  const info = stmt.run(customer_id, rating, comment || null, id);

  if (info.changes === 0) {
    return null;
  }

  return getReviewById(id);
}

function deleteReview(id) {
  const stmt = db.prepare('DELETE FROM Reviews WHERE review_id = ?');
  const info = stmt.run(id);

  return info.changes > 0;
}

// Service Areas functions
function getAllServiceAreas() {
  return db.prepare('SELECT * FROM ServiceAreas ORDER BY city').all();
}

function getServiceAreaById(id) {
  return db.prepare('SELECT * FROM ServiceAreas WHERE area_id = ?').get(id);
}

function addServiceArea({ city, zip_code, coverage_radius_miles }) {
  const stmt = db.prepare('INSERT INTO ServiceAreas (city, zip_code, coverage_radius_miles) VALUES (?, ?, ?)');
  const info = stmt.run(city, zip_code, coverage_radius_miles);

  return getServiceAreaById(info.lastInsertRowid);
}

function updateServiceArea(id, { city, zip_code, coverage_radius_miles }) {
  const stmt = db.prepare('UPDATE ServiceAreas SET city = ?, zip_code = ?, coverage_radius_miles = ? WHERE area_id = ?');
  const info = stmt.run(city, zip_code, coverage_radius_miles, id);

  if (info.changes === 0) {
    return null;
  }

  return getServiceAreaById(id);
}

function deleteServiceArea(id) {
  const stmt = db.prepare('DELETE FROM ServiceAreas WHERE area_id = ?');
  const info = stmt.run(id);

  return info.changes > 0;
}

export default {
  init,
  // Services
  getAllServices,
  getServiceById,
  addService,
  updateService,
  deleteService,
  // Customers
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  // Bookings
  getAllBookings,
  getBookingById,
  addBooking,
  updateBooking,
  deleteBooking,
  // Reviews
  getAllReviews,
  getReviewById,
  addReview,
  updateReview,
  deleteReview,
  // Service Areas
  getAllServiceAreas,
  getServiceAreaById,
  addServiceArea,
  updateServiceArea,
  deleteServiceArea
};
