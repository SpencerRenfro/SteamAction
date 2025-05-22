import { Link } from 'react-router-dom';
import SEO from './SEO';

function OFallonCarpetCleaning() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title="Carpet Cleaning in O'Fallon, IL | SteamAction Pros"
        description="Professional carpet cleaning services in O'Fallon, Illinois. Serving ZIP codes 62269 and 62236 with expert stain removal and deep cleaning."
        keywords="carpet cleaning O'Fallon, carpet cleaners O'Fallon IL, professional carpet cleaning O'Fallon Illinois"
      />
      
      <h1 className="text-4xl font-bold mb-6">Carpet Cleaning in O'Fallon, Illinois</h1>
      
      <p className="text-lg mb-4">
        SteamAction Pros provides professional carpet cleaning services throughout O'Fallon, IL. 
        Our local technicians serve all O'Fallon neighborhoods and ZIP codes 62269 and 62236.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-base-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Our O'Fallon Carpet Cleaning Services</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Deep steam cleaning for all carpet types</li>
            <li>Stain removal and treatment</li>
            <li>Pet odor elimination</li>
            <li>Allergen reduction treatments</li>
            <li>Carpet protection application</li>
          </ul>
        </div>
        <div className="bg-base-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Why Choose SteamAction in O'Fallon</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Local, family-owned business</li>
            <li>Experienced, professional technicians</li>
            <li>Eco-friendly cleaning solutions</li>
            <li>Competitive pricing</li>
            <li>100% satisfaction guarantee</li>
          </ul>
        </div>
      </div>
      
      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4">O'Fallon Areas We Serve</h2>
        <p className="mb-4">We proudly serve all neighborhoods in O'Fallon including:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div className="bg-base-200 p-3 rounded">Fairwood Hills</div>
          <div className="bg-base-200 p-3 rounded">Thornbury Hills</div>
          <div className="bg-base-200 p-3 rounded">Parkview Estates</div>
          <div className="bg-base-200 p-3 rounded">Hearthstone</div>
          <div className="bg-base-200 p-3 rounded">Savannah Hills</div>
          <div className="bg-base-200 p-3 rounded">All O'Fallon ZIP codes</div>
        </div>
      </div>
      
      <div className="my-8">
        <Link to="/calculator" className="btn btn-primary">
          Get a Free Estimate for Your O'Fallon Home
        </Link>
      </div>
    </div>
  );
}

export default OFallonCarpetCleaning;