import { useState, useEffect } from 'react';
import { Card, Button, Alert, Input, Select, Table, PaymentWrapper, PaymentReceipt } from './ui';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  // Payment state
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  // New booking form state
  const [newBooking, setNewBooking] = useState({
    // Customer information
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_address: '',
    customer_city: '',
    customer_zip: '',
    // Booking information
    service_id: '',
    appointment_date: '',
    appointment_time: '',
    square_feet: 500,
    deposit_fee: 50,
    notes: '',
    status: 'Scheduled'
  });

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/bookings');

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bookings. Is the server running?');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch services
  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setServices(data);
    } catch (err) {
      setFormError('Failed to fetch services');
      console.error('Error fetching services:', err);
    }
  };

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setFormError('Failed to fetch customers');
      console.error('Error fetching customers:', err);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({
      ...newBooking,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    // If payment is complete, we've already processed the booking
    if (paymentComplete) {
      return;
    }

    // If showing payment form, don't submit yet
    if (showPayment) {
      return;
    }

    // Validate form
    if (
      !newBooking.customer_name ||
      !newBooking.customer_email ||
      !newBooking.customer_phone ||
      !newBooking.service_id ||
      !newBooking.appointment_date ||
      !newBooking.appointment_time
    ) {
      setFormError('Please fill in all required fields');
      return;
    }

    // If we're not showing payment yet, show it now
    if (!showPayment && !paymentComplete) {
      proceedToPayment();
      return;
    }

    try {
      setIsProcessingPayment(true);

      // In a real application, you would process the payment first,
      // then create the booking with the payment information

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      // Add the new booking to the list
      setBookings([...bookings, data]);

      // Reset form
      setNewBooking({
        customer_id: '',
        service_id: '',
        appointment_date: '',
        appointment_time: '',
        square_feet: 500,
        deposit_fee: 50,
        notes: '',
        status: 'Scheduled'
      });

      // Show success message
      setFormSuccess('Booking created successfully!');

      // In a real application, you would not close the modal immediately
      // but wait for payment to complete

    } catch (err) {
      setFormError('Failed to create booking');
      console.error('Error creating booking:', err);
      setIsProcessingPayment(false);
    }
  };

  // Handle payment success
  const handlePaymentSuccess = (payment) => {
    setIsProcessingPayment(false);
    setPaymentComplete(true);
    setPaymentDetails(payment);

    // In a real application, you would update the booking with payment information
    // and change its status to "Confirmed" or similar

    // Show success message
    setFormSuccess('Payment successful! Your booking is confirmed.');
  };

  // Handle payment error
  const handlePaymentError = (error) => {
    setIsProcessingPayment(false);
    setFormError('Payment failed: ' + (error.message || 'Unknown error'));
  };

  // Proceed to payment
  const proceedToPayment = () => {
    setShowPayment(true);
  };

  // Close payment and receipt
  const closePaymentReceipt = () => {
    setPaymentComplete(false);
    setPaymentDetails(null);
    setIsModalOpen(false);
  };

  // Open modal and fetch data
  const openBookingModal = () => {
    setIsModalOpen(true);
    fetchServices();
    fetchCustomers();
    setFormError(null);
    setFormSuccess(null);
    setShowPayment(false);
    setPaymentComplete(false);
    setPaymentDetails(null);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Bookings</h1>

      <div className="flex justify-between items-center mb-6">
        <div>
          {error && (
            <Alert
              variant="error"
              className="mb-4"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
            >
              {error}
            </Alert>
          )}
        </div>
        <Button
          variant="primary"
          onClick={openBookingModal}
          className="mb-4"
        >
          Request Booking
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading bookings...</div>
      ) : (
        <Table
          columns={[
            { key: 'booking_id', label: 'ID' },
            { key: 'customer_name', label: 'Customer' },
            { key: 'service_name', label: 'Service' },
            { key: 'appointment_date', label: 'Date' },
            { key: 'appointment_time', label: 'Time' },
            { key: 'square_feet', label: 'Square Feet' },
            { key: 'status', label: 'Status' }
          ]}
          data={bookings}
          hoverable
          zebra
          renderCell={(row, key) => {
            if (key === 'square_feet') {
              return `${row[key]} sq ft`;
            }
            if (key === 'status') {
              return (
                <span className={`badge ${
                  row.status === 'Completed' ? 'badge-success' :
                  row.status === 'Cancelled' ? 'badge-error' :
                  'badge-info'
                }`}>
                  {row.status}
                </span>
              );
            }
            return row[key];
          }}
        />
      )}

      {/* Booking Request Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 md:p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Card
              title="Request a Booking"
              className="w-full max-w-2xl py-6 px-6 max-h-[95vh] overflow-y-auto"
            actions={
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                >
                  Submit Request
                </Button>
              </div>
            }
          >
            {formError && (
              <Alert variant="error" className="mb-4">
                {formError}
              </Alert>
            )}

            {formSuccess && (
              <Alert variant="success" className="mb-4">
                {formSuccess}
              </Alert>
            )}

            <form className="space-y-3">
              <h3 className="font-medium text-lg mb-2">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <Input
                  label="Full Name"
                  name="customer_name"
                  value={newBooking.customer_name}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  label="Email"
                  name="customer_email"
                  type="email"
                  value={newBooking.customer_email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <Input
                  label="Phone"
                  name="customer_phone"
                  value={newBooking.customer_phone}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  label="Address"
                  name="customer_address"
                  value={newBooking.customer_address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="City"
                  name="customer_city"
                  value={newBooking.customer_city}
                  onChange={handleInputChange}
                />

                <Input
                  label="ZIP Code"
                  name="customer_zip"
                  value={newBooking.customer_zip}
                  onChange={handleInputChange}
                />
              </div>

              <h3 className="font-medium text-lg mb-2">Service Information</h3>

              <Select
                label="Service"
                name="service_id"
                value={newBooking.service_id}
                onChange={handleInputChange}
                options={services.map(service => ({
                  value: service.service_id,
                  label: `${service.name} ($${service.price_per_sqft}/sq ft)`
                }))}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Date"
                  name="appointment_date"
                  type="date"
                  value={newBooking.appointment_date}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  label="Time"
                  name="appointment_time"
                  type="time"
                  value={newBooking.appointment_time}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Square Feet"
                  name="square_feet"
                  type="number"
                  value={newBooking.square_feet}
                  onChange={handleInputChange}
                  min="100"
                />

                <Input
                  label="Deposit Fee ($)"
                  name="deposit_fee"
                  type="number"
                  value={newBooking.deposit_fee}
                  onChange={handleInputChange}
                  min="0"
                  step="5"
                  helperText="This deposit is applied towards your final bill"
                />
              </div>

              <Alert
                variant="info"
                className="bg-blue-50 text-blue-700 border border-blue-200"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              >
                <p className="text-sm">
                  A deposit fee is required to secure your booking. This amount will be applied towards your final bill.
                  Cancellations with less than 24 hours notice may forfeit the deposit.
                </p>
              </Alert>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Notes</span>
                </label>
                <textarea
                  name="notes"
                  value={newBooking.notes}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full"
                  placeholder="Any special instructions or requirements"
                  rows="3"
                />
              </div>
            </form>
          </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;
