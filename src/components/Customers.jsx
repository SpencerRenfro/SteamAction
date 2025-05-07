import { useState, useEffect } from 'react';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/customers');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setCustomers(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch customers. Is the server running?');
        console.error('Error fetching customers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Customers</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-4">Loading customers...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.length === 0 ? (
            <div className="col-span-full text-center py-4">No customers found</div>
          ) : (
            customers.map((customer) => (
              <div key={customer.customer_id} className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h2 className="card-title">{customer.full_name}</h2>
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Email:</span> {customer.email || 'N/A'}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> {customer.phone_number || 'N/A'}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span> {customer.address || 'N/A'}
                    </p>
                    <p>
                      <span className="font-semibold">City:</span> {customer.city || 'N/A'}
                    </p>
                    <p>
                      <span className="font-semibold">Zip Code:</span> {customer.zip_code || 'N/A'}
                    </p>
                    <p>
                      <span className="font-semibold">Customer Since:</span> {new Date(customer.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Customers;
