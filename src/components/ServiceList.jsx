import { useState, useEffect } from 'react';
import { Card, Button, Alert, Input, Table } from './ui';

function ServiceList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price_per_sqft: 0,
    duration_minutes: 0
  });

  // Fetch services from the API
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/services');

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setServices(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch services. Is the server running?');
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new service
  const handleAddService = async (e) => {
    e.preventDefault();

    if (!newService.name.trim()) {
      return;
    }

    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const addedService = await response.json();
      setServices([...services, addedService]);
      setNewService({
        name: '',
        description: '',
        price_per_sqft: 0,
        duration_minutes: 0
      });
    } catch (err) {
      setError('Failed to add service');
      console.error('Error adding service:', err);
    }
  };

  // Delete a service
  const handleDeleteService = async (id) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setServices(services.filter(service => service.service_id !== id));
    } catch (err) {
      setError('Failed to delete service');
      console.error('Error deleting service:', err);
    }
  };

  // Load services when component mounts
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Cleaning Services</h2>

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

      <form onSubmit={handleAddService} className="mb-6 bg-base-200 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Add New Service</h3>
        <Input
          label="Name"
          type="text"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          placeholder="Service name"
          required
          className="mb-4"
        />

        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            className="textarea textarea-bordered w-full"
            placeholder="Service description"
            rows="3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Price per sq ft ($)"
            type="number"
            step="0.01"
            min="0"
            value={newService.price_per_sqft}
            onChange={(e) => setNewService({ ...newService, price_per_sqft: parseFloat(e.target.value) })}
            placeholder="0.00"
          />

          <Input
            label="Duration (minutes)"
            type="number"
            min="0"
            value={newService.duration_minutes}
            onChange={(e) => setNewService({ ...newService, duration_minutes: parseInt(e.target.value) })}
            placeholder="0"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
        >
          Add Service
        </Button>
      </form>

      {loading ? (
        <div className="text-center py-4">Loading services...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.length === 0 ? (
            <div className="col-span-full text-center py-4">No services found</div>
          ) : (
            services.map((service) => (
              <Card
                key={service.service_id}
                title={service.name}
                subtitle={service.description || 'No description'}
                actions={
                  <Button
                    variant="error"
                    size="sm"
                    onClick={() => handleDeleteService(service.service_id)}
                  >
                    Delete
                  </Button>
                }
              >
                <div className="grid grid-cols-2 gap-2 my-2">
                  <div className="bg-base-200 p-2 rounded">
                    <span className="text-xs font-semibold">Price:</span>
                    <p className="font-bold">${service.price_per_sqft}/sq ft</p>
                  </div>
                  <div className="bg-base-200 p-2 rounded">
                    <span className="text-xs font-semibold">Duration:</span>
                    <p className="font-bold">{service.duration_minutes} min</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ServiceList;
