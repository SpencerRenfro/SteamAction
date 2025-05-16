import SEO from './SEO';

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title="Professional Cleaning Services"
        description="SteamAction provides top-quality cleaning services for homes and businesses with eco-friendly products and experienced professionals."
        keywords="carpet cleaning, upholstery cleaning, professional cleaning, eco-friendly cleaning"
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to SteamAction
        </h1>
        <div className="bg-base-200 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Professional Cleaning Services
          </h2>
          <p className="mb-4">
            SteamAction provides top-quality cleaning services for homes and
            businesses. Our team of experienced professionals uses
            state-of-the-art equipment and eco-friendly products to ensure your
            space is spotless.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="bg-base-100 p-6 rounded-md shadow">
              <h3 className="font-bold text-lg mb-2">Residential Cleaning</h3>
              <p>
                Keep your home fresh and clean with our comprehensive
                residential cleaning services.
              </p>
            </div>
            <div className="bg-base-100 p-6 rounded-md shadow">
              <h3 className="font-bold text-lg mb-2">Commercial Cleaning</h3>
              <p>
                Maintain a professional environment with our reliable commercial
                cleaning solutions.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-base-200 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Experienced and professional cleaning staff</li>
            <li>Eco-friendly cleaning products</li>
            <li>Flexible scheduling options</li>
            <li>Competitive pricing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;


