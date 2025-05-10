import { useState, useEffect } from 'react';

function ServiceList() {
  // Sample service data
  const sampleServices = [
    {
      service_id: 1,
      name: "Basic Carpet Cleaning",
      description: "Standard carpet cleaning service for regular maintenance.",
      price_per_sqft: 0.25,
      duration_minutes: 60
    },
    {
      service_id: 2,
      name: "Deep Carpet Cleaning",
      description: "Intensive cleaning for heavily soiled carpets.",
      price_per_sqft: 0.40,
      duration_minutes: 90
    },
    {
      service_id: 3,
      name: "Pet Stain Treatment",
      description: "Specialized treatment for pet stains and odors.",
      price_per_sqft: 0.35,
      duration_minutes: 75
    },
    {
      service_id: 4,
      name: "Move-In/Move-Out Cleaning",
      description: "Comprehensive cleaning for moving situations.",
      price_per_sqft: 0.45,
      duration_minutes: 120
    },
    {
      service_id: 5,
      name: "Commercial Carpet Cleaning",
      description: "Professional cleaning for office and commercial spaces.",
      price_per_sqft: 0.30,
      duration_minutes: 90
    },
    {
      service_id: 6,
      name: "Area Rug Cleaning",
      description: "Specialized cleaning for delicate area rugs.",
      price_per_sqft: 0.50,
      duration_minutes: 60
    }
  ];

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load services when component mounts
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setServices(sampleServices);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Cleaning Services</h1>

      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-center text-lg mb-6">
          We offer a variety of professional cleaning services to meet your needs.
          Each service is performed by our trained and experienced staff using high-quality equipment.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">Loading services...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length === 0 ? (
            <div className="col-span-full text-center py-4">No services found</div>
          ) : (
            services.map((service) => (
              <div key={service.service_id} className="bg-base-200 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                  <p className="text-gray-600 mb-4">{service.description || 'No description'}</p>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-base-100 p-3 rounded">
                      <span className="text-xs font-semibold">Price:</span>
                      <p className="font-bold">${service.price_per_sqft}/sq ft</p>
                    </div>
                    <div className="bg-base-100 p-3 rounded">
                      <span className="text-xs font-semibold">Duration:</span>
                      <p className="font-bold">{service.duration_minutes} min</p>
                    </div>
                  </div>
                </div>
                <div className="bg-base-300 px-6 py-3">
                  <button className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-focus">
                    Book Now
                  </button>
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
