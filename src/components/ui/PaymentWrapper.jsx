import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../utils/stripe';
import PaymentForm from './PaymentForm';

/**
 * Payment wrapper component that provides Stripe context
 * 
 * @param {Object} props - Component props
 * @param {number} props.amount - Payment amount in dollars
 * @param {Function} props.onPaymentSuccess - Callback function when payment is successful
 * @param {Function} props.onPaymentError - Callback function when payment fails
 * @param {string} props.buttonText - Text for the payment button
 * @param {boolean} props.isProcessing - Whether payment is being processed
 */
function PaymentWrapper(props) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
}

export default PaymentWrapper;
