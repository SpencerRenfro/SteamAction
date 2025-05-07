import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Alert } from './index';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

/**
 * Payment form component with Stripe integration
 * 
 * @param {Object} props - Component props
 * @param {number} props.amount - Payment amount in dollars
 * @param {Function} props.onPaymentSuccess - Callback function when payment is successful
 * @param {Function} props.onPaymentError - Callback function when payment fails
 * @param {string} props.buttonText - Text for the payment button
 * @param {boolean} props.isProcessing - Whether payment is being processed
 */
function PaymentForm({ 
  amount, 
  onPaymentSuccess, 
  onPaymentError, 
  buttonText = 'Pay Now', 
  isProcessing = false 
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (isProcessing) {
      return;
    }

    if (!cardComplete) {
      setError('Please complete your card details');
      return;
    }

    try {
      // In a real implementation, you would create a payment intent on your server
      // and return the client secret to use here
      // For this example, we'll simulate a successful payment
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful payment
      onPaymentSuccess({
        id: 'pi_' + Math.random().toString(36).substr(2, 9),
        amount: amount,
        created: Date.now(),
        status: 'succeeded'
      });
      
      // In a real implementation, you would use something like this:
      /*
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setError(error.message);
        onPaymentError(error);
      } else if (paymentIntent.status === 'succeeded') {
        onPaymentSuccess(paymentIntent);
      }
      */
    } catch (err) {
      setError('An unexpected error occurred.');
      onPaymentError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="error" className="mb-4">
          {error}
        </Alert>
      )}
      
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium">Card Details</span>
        </label>
        <div className="p-3 border rounded-lg bg-white">
          <CardElement 
            options={CARD_ELEMENT_OPTIONS} 
            onChange={(e) => setCardComplete(e.complete)}
          />
        </div>
      </div>
      
      <div className="mt-4">
        <Button 
          type="submit" 
          variant="primary" 
          disabled={!stripe || isProcessing}
          wide
        >
          {isProcessing ? 'Processing...' : buttonText}
        </Button>
      </div>
      
      <div className="text-xs text-gray-500 mt-2">
        <p>This is a secure payment. Your card details are encrypted.</p>
        <p>For testing, you can use card number: 4242 4242 4242 4242</p>
        <p>Any future date, any 3 digits for CVC, and any 5 digits for postal code.</p>
      </div>
    </form>
  );
}

export default PaymentForm;
