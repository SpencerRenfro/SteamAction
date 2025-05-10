import { useState, useEffect } from 'react';

function ServiceList() {
  // Service data for carpet, tile, grout, and upholstery cleaning
  const sampleServices = [
    {
      service_id: 1,
      name: "Carpet Cleaning",
      description: "Professional hot water extraction carpet cleaning that removes dirt, allergens, and stains from your carpets.",
      price_per_sqft: 0.30,
      duration_minutes: 60
    },
    {
      service_id: 2,
      name: "Tile Cleaning",
      description: "Thorough cleaning of tile surfaces to remove dirt, grime, and restore the original appearance of your tiles.",
      price_per_sqft: 0.45,
      duration_minutes: 75
    },
    {
      service_id: 3,
      name: "Grout Cleaning",
      description: "Specialized cleaning to remove dirt and discoloration from grout lines between tiles, restoring their original color.",
      price_per_sqft: 0.50,
      duration_minutes: 90
    },
    {
      service_id: 4,
      name: "Upholstery Cleaning",
      description: "Gentle yet effective cleaning for sofas, chairs, and other upholstered furniture to remove stains and odors.",
      price_per_sqft: 0.55,
      duration_minutes: 60
    }
  ];

  // Always use hardcoded data for now
  const [services, setServices] = useState(sampleServices);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // No API calls for now, just using hardcoded data
  // This comment is left here to indicate where API calls would normally go

  // If we need to simulate loading for UI testing
  useEffect(() => {
    // This is just for demonstration purposes
    // In a real app with hardcoded data, we wouldn't need this
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
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
