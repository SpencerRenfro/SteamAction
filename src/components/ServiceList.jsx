import { useState, useEffect } from 'react';

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
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleAddService} className="mb-6 bg-base-200 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Add New Service</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Service name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            className="textarea textarea-bordered w-full"
            placeholder="Service description"
            rows="3"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price per sq ft ($)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={newService.price_per_sqft}
              onChange={(e) => setNewService({ ...newService, price_per_sqft: parseFloat(e.target.value) })}
              className="input input-bordered w-full"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
            <input
              type="number"
              min="0"
              value={newService.duration_minutes}
              onChange={(e) => setNewService({ ...newService, duration_minutes: parseInt(e.target.value) })}
              className="input input-bordered w-full"
              placeholder="0"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Service
        </button>
      </form>
      
      {loading ? (
        <div className="text-center py-4">Loading services...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.length === 0 ? (
            <div className="col-span-full text-center py-4">No services found</div>
          ) : (
            services.map((service) => (
              <div key={service.service_id} className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h3 className="card-title">{service.name}</h3>
                  <p className="text-sm">{service.description || 'No description'}</p>
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
                  <div className="card-actions justify-end mt-2">
                    <button
                      onClick={() => handleDeleteService(service.service_id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
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

export default ServiceList;
