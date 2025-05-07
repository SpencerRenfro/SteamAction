import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe publishable key
// In a real application, this would come from an environment variable
const stripePublishableKey = 'pk_test_TYooMQauvdEDq54NiTphI7jx';

// Initialize Stripe
const stripePromise = loadStripe(stripePublishableKey);

export default stripePromise;
