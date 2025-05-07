import { useState, useEffect } from 'react';
import { Card, Button, Alert, Input, Select, Checkbox } from './ui';

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

      {loading ? (
        <div className="text-center py-4">Loading services...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Calculator Inputs */}
          <Card title="Estimate Your Cleaning Cost" bgColor="bg-base-200">
            <Select
              label="Select Service"
              options={services.map(service => ({
                value: service.service_id,
                label: `${service.name} ($${service.price_per_sqft}/sq ft)`
              }))}
              value={selectedService?.service_id || ''}
              onChange={handleServiceChange}
              className="mb-4"
            />

            <Input
              label="Number of Rooms"
              type="number"
              value={rooms}
              onChange={handleRoomsChange}
              min="1"
              helperText={`Estimated square footage: ${squareFeet} sq ft`}
              className="mb-4"
            />

            <Input
              label="Square Feet (Manual Entry)"
              type="number"
              value={squareFeet}
              onChange={handleSquareFeetChange}
              min="100"
              className="mb-4"
            />

            <div className="space-y-2 mb-4">
              <Checkbox
                label="Heavy Stains (+10%)"
                checked={hasStains}
                onChange={(e) => setHasStains(e.target.checked)}
                color="primary"
              />

              <Checkbox
                label="Pet Treatment (+15%)"
                checked={hasPets}
                onChange={(e) => setHasPets(e.target.checked)}
                color="primary"
              />
            </div>
          </Card>

          {/* Results */}
          <Card title="Your Estimate" bgColor="bg-base-200">
            {selectedService && (
              <div className="space-y-4">
                <Card title="Selected Service" bordered compact>
                  <p className="text-xl font-bold text-primary">{selectedService.name}</p>
                  <p className="text-sm">{selectedService.description}</p>
                </Card>

                <Card title="Area to Clean" bordered compact>
                  <p className="text-xl font-bold">{squareFeet} square feet</p>
                  <p className="text-sm">{rooms} room{rooms !== 1 ? 's' : ''}</p>
                </Card>

                <Card title="Estimated Time" bordered compact>
                  <p className="text-xl font-bold">{estimatedTime} minutes</p>
                  <p className="text-sm">
                    {Math.floor(estimatedTime / 60) > 0 ? `${Math.floor(estimatedTime / 60)} hour${Math.floor(estimatedTime / 60) !== 1 ? 's' : ''} ` : ''}
                    {estimatedTime % 60 > 0 ? `${estimatedTime % 60} minute${estimatedTime % 60 !== 1 ? 's' : ''}` : ''}
                  </p>
                </Card>

                <Card title="Estimated Cost" bordered bgColor="bg-primary" className="text-primary-content">
                  <p className="text-3xl font-bold">${estimatedCost.toFixed(2)}</p>
                  <p className="text-sm">Based on ${selectedService.price_per_sqft}/sq ft</p>
                </Card>

                <Button variant="primary" wide>Book This Service</Button>
              </div>
            )}
          </Card>
        </div>
      )}

      <Card
        title="About Our Calculator"
        bgColor="bg-base-200"
        className="max-w-4xl mx-auto mt-12"
        actions={
          <Button variant="primary">Contact Us</Button>
        }
      >
        <p className="mb-4">
          This calculator provides an estimate based on the square footage of your space and the selected service.
          The actual cost may vary depending on the condition of your carpets and any additional services required.
        </p>
        <p>
          For a precise quote, please contact us directly. We're happy to provide a free on-site assessment.
        </p>
      </Card>
    </div>
  );
}

export default CarpetCalculator;
