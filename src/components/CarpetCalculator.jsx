import { useState, useEffect } from 'react';

function CarpetCalculator() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Calculator state
  const [selectedService, setSelectedService] = useState(null);
  const [squareFeet, setSquareFeet] = useState(500);
  const [rooms, setRooms] = useState(3);
  const [hasStains, setHasStains] = useState(false);
  const [hasPets, setHasPets] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);

  // Fetch services from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/services');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setServices(data);
        if (data.length > 0) {
          setSelectedService(data[0]);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch services. Is the server running?');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Calculate estimated cost and time whenever inputs change
  useEffect(() => {
    if (!selectedService) return;

    // Base calculation using price per square foot
    let cost = squareFeet * selectedService.price_per_sqft;
    
    // Add extra for stains (10% more)
    if (hasStains) {
      cost *= 1.1;
    }
    
    // Add extra for pets (15% more)
    if (hasPets) {
      cost *= 1.15;
    }
    
    // Round to 2 decimal places
    cost = Math.round(cost * 100) / 100;
    
    // Calculate estimated time based on service duration and square footage
    // Assume the duration_minutes is for 1000 sq ft
    const baseTime = selectedService.duration_minutes;
    let time = (squareFeet / 1000) * baseTime;
    
    // Add extra time for stains and pets
    if (hasStains) time *= 1.15;
    if (hasPets) time *= 1.2;
    
    // Round to nearest 5 minutes
    time = Math.ceil(time / 5) * 5;
    
    setEstimatedCost(cost);
    setEstimatedTime(time);
  }, [selectedService, squareFeet, rooms, hasStains, hasPets]);

  // Handle service selection
  const handleServiceChange = (e) => {
    const serviceId = parseInt(e.target.value);
    const service = services.find(s => s.service_id === serviceId);
    setSelectedService(service);
  };

  // Handle square feet input
  const handleSquareFeetChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setSquareFeet(value);
    }
  };

  // Handle rooms input
  const handleRoomsChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setRooms(value);
      // Estimate square footage based on rooms (average 150 sq ft per room)
      setSquareFeet(value * 150);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Carpet Cleaning Calculator</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-4">Loading services...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Calculator Inputs */}
          <div className="bg-base-200 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Estimate Your Cleaning Cost</h2>
            
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Select Service</span>
              </label>
              <select 
                className="select select-bordered w-full" 
                onChange={handleServiceChange}
                value={selectedService?.service_id || ''}
              >
                {services.map(service => (
                  <option key={service.service_id} value={service.service_id}>
                    {service.name} (${service.price_per_sqft}/sq ft)
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Number of Rooms</span>
              </label>
              <input 
                type="number" 
                className="input input-bordered w-full" 
                value={rooms}
                onChange={handleRoomsChange}
                min="1"
              />
              <label className="label">
                <span className="label-text-alt">Estimated square footage: {squareFeet} sq ft</span>
              </label>
            </div>
            
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Square Feet (Manual Entry)</span>
              </label>
              <input 
                type="number" 
                className="input input-bordered w-full" 
                value={squareFeet}
                onChange={handleSquareFeetChange}
                min="100"
              />
            </div>
            
            <div className="flex flex-col gap-2 mb-4">
              <label className="cursor-pointer label justify-start gap-2">
                <input 
                  type="checkbox" 
                  className="checkbox checkbox-primary" 
                  checked={hasStains}
                  onChange={(e) => setHasStains(e.target.checked)}
                />
                <span className="label-text">Heavy Stains (+10%)</span>
              </label>
              
              <label className="cursor-pointer label justify-start gap-2">
                <input 
                  type="checkbox" 
                  className="checkbox checkbox-primary" 
                  checked={hasPets}
                  onChange={(e) => setHasPets(e.target.checked)}
                />
                <span className="label-text">Pet Treatment (+15%)</span>
              </label>
            </div>
          </div>
          
          {/* Results */}
          <div className="bg-base-200 p-6 rounded-lg shadow-md flex flex-col justify-center">
            <h2 className="text-xl font-semibold mb-6">Your Estimate</h2>
            
            {selectedService && (
              <div className="space-y-4">
                <div className="bg-base-100 p-4 rounded-md">
                  <h3 className="font-medium text-lg">Selected Service</h3>
                  <p className="text-xl font-bold text-primary">{selectedService.name}</p>
                  <p className="text-sm">{selectedService.description}</p>
                </div>
                
                <div className="bg-base-100 p-4 rounded-md">
                  <h3 className="font-medium">Area to Clean</h3>
                  <p className="text-xl font-bold">{squareFeet} square feet</p>
                  <p className="text-sm">{rooms} room{rooms !== 1 ? 's' : ''}</p>
                </div>
                
                <div className="bg-base-100 p-4 rounded-md">
                  <h3 className="font-medium">Estimated Time</h3>
                  <p className="text-xl font-bold">{estimatedTime} minutes</p>
                  <p className="text-sm">
                    {Math.floor(estimatedTime / 60) > 0 ? `${Math.floor(estimatedTime / 60)} hour${Math.floor(estimatedTime / 60) !== 1 ? 's' : ''} ` : ''}
                    {estimatedTime % 60 > 0 ? `${estimatedTime % 60} minute${estimatedTime % 60 !== 1 ? 's' : ''}` : ''}
                  </p>
                </div>
                
                <div className="bg-primary text-primary-content p-4 rounded-md">
                  <h3 className="font-medium">Estimated Cost</h3>
                  <p className="text-3xl font-bold">${estimatedCost.toFixed(2)}</p>
                  <p className="text-sm">Based on ${selectedService.price_per_sqft}/sq ft</p>
                </div>
                
                <button className="btn btn-primary w-full mt-4">Book This Service</button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto mt-12 p-6 bg-base-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">About Our Calculator</h2>
        <p className="mb-4">
          This calculator provides an estimate based on the square footage of your space and the selected service.
          The actual cost may vary depending on the condition of your carpets and any additional services required.
        </p>
        <p>
          For a precise quote, please contact us directly. We're happy to provide a free on-site assessment.
        </p>
      </div>
    </div>
  );
}

export default CarpetCalculator;
