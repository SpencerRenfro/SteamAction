import { useState } from 'react';

function ServiceAreas() {
  // Sample service area data
  const serviceAreaData = [
    { city: "Seattle", zipCodes: ["98101", "98102", "98103", "98104", "98105"], radius: 15 },
    { city: "Bellevue", zipCodes: ["98004", "98005", "98006", "98007", "98008"], radius: 10 },
    { city: "Redmond", zipCodes: ["98052", "98053", "98073"], radius: 8 },
    { city: "Kirkland", zipCodes: ["98033", "98034"], radius: 10 },
    { city: "Renton", zipCodes: ["98055", "98056", "98057", "98058", "98059"], radius: 12 }
  ];

  const [searchZip, setSearchZip] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchZip || searchZip.length !== 5) {
      setSearchResult({ found: false, message: "Please enter a valid 5-digit ZIP code." });
      return;
    }
    
    // Check if the ZIP code is in our service areas
    for (const area of serviceAreaData) {
      if (area.zipCodes.includes(searchZip)) {
        setSearchResult({
          found: true,
          city: area.city,
          radius: area.radius,
          message: `Great news! We service ${area.city} (ZIP: ${searchZip}) and surrounding areas within a ${area.radius}-mile radius.`
        });
        return;
      }
    }
    
    setSearchResult({
      found: false,
      message: `Sorry, we don't currently service ZIP code ${searchZip}. Please contact us to inquire about service availability.`
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Service Areas</h1>

      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-center text-lg mb-6">
          SteamAction provides cleaning services in the following areas.
          Check if your location is within our service radius!
        </p>
        
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
          <div className="flex">
            <input
              type="text"
              placeholder="Enter ZIP code"
              value={searchZip}
              onChange={(e) => setSearchZip(e.target.value)}
              className="flex-grow p-2 border rounded-l-md"
              maxLength={5}
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-focus"
            >
              Check
            </button>
          </div>
        </form>
        
        {searchResult && (
          <div className={`p-4 rounded-md mb-8 ${searchResult.found ? 'bg-success text-success-content' : 'bg-error text-error-content'}`}>
            {searchResult.message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {serviceAreaData.map((area, index) => (
          <div key={index} className="bg-base-200 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{area.city}</h2>
            <p className="mb-2">Service radius: {area.radius} miles</p>
            <div>
              <h3 className="font-medium mb-1">ZIP Codes:</h3>
              <div className="flex flex-wrap gap-1">
                {area.zipCodes.map((zip) => (
                  <span key={zip} className="bg-base-300 px-2 py-1 rounded-md text-sm">
                    {zip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-12 p-6 bg-base-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Not in our service area?</h2>
        <p className="mb-4">
          Don't see your location listed? Contact us to inquire about service availability in your area.
          We're constantly expanding our coverage to serve more communities!
        </p>
        <div className="text-center mt-4">
          <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-focus">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceAreas;
