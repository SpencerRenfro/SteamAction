import { useState } from 'react';
import { useModal } from '../context/ModalContext';
import SEO from './SEO';
import { Link } from 'react-router-dom';

function ServiceAreas() {
  const { openContactModal } = useModal();
  // Hardcoded service area data
  const serviceAreaData = [
    { city: "O'Fallon", zipCodes: ["62269", "62236"], radius: 15 },
    { city: "Carlinville", zipCodes: ["62626"], radius: 10 },
    { city: "Greenville", zipCodes: ["62246"], radius: 12 },
    { city: "Highland", zipCodes: ["62249"], radius: 15 },
    { city: "Belleville", zipCodes: ["62220", "62221", "62222", "62223"], radius: 20 }
  ];

  const [searchZip, setSearchZip] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // No API calls for now, just using hardcoded data
  // This comment is left here to indicate where API calls would normally go

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
          SteamAction provides cleaning services in O'Fallon, Carlinville, Greenville, Highland, Belleville and surrounding areas.
          Check if your location is within our service radius!
        </p>


        {searchResult && (
          <div className={`p-4 rounded-md mb-8 ${searchResult.found ? 'bg-success text-success-content' : 'bg-error text-error-content'}`}>
            {searchResult.message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {serviceAreaData.map((area) => (
          <div key={area.city} className="bg-base-200 p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2">{area.city}</h2>
            <p className="mb-2">Service radius: {area.radius} miles</p>
            
            {/* Add special link for O'Fallon */}
            {area.city === "O'Fallon" && (
              <Link to="/carpet-cleaning-ofallon-il" className="text-primary hover:underline">
                Learn more about our carpet cleaning services in O'Fallon →
              </Link>
            )}
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
          <button
            onClick={openContactModal}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-focus"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceAreas;



