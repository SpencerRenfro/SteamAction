import { useState, useEffect } from 'react';

function ServiceAreas() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceAreas = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/service-areas');

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setAreas(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch service areas. Is the server running?');
        console.error('Error fetching service areas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceAreas();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Service Areas</h1>

      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-center text-lg mb-6">
          SteamAction provides cleaning services in the following areas.
          Check if your location is within our service radius!
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">Loading service areas...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full max-w-2xl mx-auto">
            <thead>
              <tr>
                <th>City</th>
                <th>Zip Code</th>
                {/* <th>Coverage Radius</th> */}
              </tr>
            </thead>
            <tbody>
              {areas.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">No service areas found</td>
                </tr>
              ) : (
                areas.map((area) => (
                  <tr key={area.area_id} className="hover">
                    <td>{area.city}</td>
                    <td>{area.zip_code}</td>
                    {/* <td>{area.coverage_radius_miles} miles</td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="max-w-4xl mx-auto mt-12 p-6 bg-base-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Not in our service area?</h2>
        <p className="mb-4">
          Don't see your location listed? Contact us to inquire about service availability in your area.
          We're constantly expanding our coverage to serve more communities!
        </p>
        <div className="text-center mt-4">
          <button className="btn btn-primary">Contact Us</button>
        </div>
      </div>
    </div>
  );
}

export default ServiceAreas;
