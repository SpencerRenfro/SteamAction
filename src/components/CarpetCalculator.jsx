import { useState } from 'react';
import SEO from './SEO';

function CarpetCalculator() {
  const [squareFeet, setSquareFeet] = useState(500);
  const [rooms, setRooms] = useState(3);
  const [hasStains, setHasStains] = useState(false);
  const [hasPets, setHasPets] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);

  // Base rates
  const baseRatePerSqFt = 0.25;
  const stainTreatmentRate = 0.10;
  const petTreatmentRate = 0.15;

  // Calculate estimates when inputs change
  const calculateEstimates = () => {
    let cost = squareFeet * baseRatePerSqFt;

    let costForNumRooms = 0;

    if (rooms > 3) {
      costForNumRooms += (rooms - 3) * 39;
    }

    
    // Add stain treatment if needed
    if (hasStains) {
      cost += 20;
    }
    
    // Add pet treatment if needed
    if (hasPets) {
      cost += 15;
    }

    // min cost to come out is 129.00
    if(cost < 129.00) {
      cost = 129.00;
    }

    if(costForNumRooms != 0) {
      cost += costForNumRooms;
    }
    
    // Round to 2 decimal places
    cost = Math.round(cost * 100) / 100;
    
    // Estimate time (1 hour per 500 sq ft + 15 min per room)
    const timeInHours = (squareFeet / 500) + (rooms * 0.25);
    
    setEstimatedCost(cost);
    setEstimatedTime(timeInHours);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    calculateEstimates();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title="Carpet Cleaning Calculator"
        description="Calculate the cost of professional carpet cleaning services based on square footage, rooms, and special treatments."
        keywords="carpet cleaning calculator, cleaning cost estimator, professional carpet cleaning"
      />
      
      <h1 className="text-3xl font-bold text-center mb-8">Carpet Cleaning Calculator</h1>
      
      <div className="max-w-2xl mx-auto bg-base-200 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Square Footage</label>
            <input
              type="number"
              min="100"
              value={squareFeet}
              onChange={(e) => setSquareFeet(Number(e.target.value))}
              className="w-full p-2 border rounded-md bg-base-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Number of Rooms</label>
            <input
              type="number"
              min="1"
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="w-full p-2 border rounded-md bg-base-100"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="stains"
              checked={hasStains}
              onChange={(e) => setHasStains(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="stains">Heavy Stains (+$20.00)</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="pets"
              checked={hasPets}
              onChange={(e) => setHasPets(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="pets">Pet Treatment (+$15.00)</label>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-focus"
          >
            Calculate Estimate
          </button>
        </form>
        
        {estimatedCost > 0 && (
          <div className="mt-8 p-4 bg-base-300 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Estimate Results</h2>
            <p className="mb-2">
              <span className="font-medium">Estimated Cost:</span> ${estimatedCost.toFixed(2)}
            </p>
            <p>
              <span className="font-medium">Estimated Time:</span> {Math.floor(estimatedTime)} hour(s) {Math.round((estimatedTime % 1) * 60)} minutes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarpetCalculator;




