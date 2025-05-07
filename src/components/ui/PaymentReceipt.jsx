import React from 'react';
import { Card, Button } from './index';

/**
 * Payment receipt component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.payment - Payment details
 * @param {Object} props.booking - Booking details
 * @param {Function} props.onClose - Function to call when closing the receipt
 */
function PaymentReceipt({ payment, booking, onClose }) {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card 
      title="Payment Receipt" 
      className="max-w-md mx-auto print:shadow-none"
      actions={
        <div className="flex justify-end gap-2 print:hidden">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePrint}>
            Print Receipt
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold">SteamAction Cleaning</h3>
          <p className="text-sm text-gray-500">Receipt #{payment.id}</p>
          <p className="text-sm text-gray-500">{formatDate(payment.created)}</p>
        </div>

        <div className="border-t border-b py-4">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Service:</span>
            <span>{booking.service_name}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Date:</span>
            <span>{booking.appointment_date}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Time:</span>
            <span>{booking.appointment_time}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Square Feet:</span>
            <span>{booking.square_feet} sq ft</span>
          </div>
        </div>

        <div className="border-b pb-4">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Deposit Amount:</span>
            <span>${payment.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Payment Status:</span>
            <span className="text-green-600 font-medium capitalize">{payment.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Payment Method:</span>
            <span>Credit Card</span>
          </div>
        </div>

        <div className="text-sm text-gray-600 mt-4">
          <p className="mb-2">This deposit will be applied to your final bill.</p>
          <p>Thank you for choosing SteamAction Cleaning!</p>
        </div>
      </div>
    </Card>
  );
}

export default PaymentReceipt;
