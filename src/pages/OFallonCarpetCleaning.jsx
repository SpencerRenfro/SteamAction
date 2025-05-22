import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

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
      
      {/* Add O'Fallon-specific content */}
    </div>
  );
}

export default OFallonCarpetCleaning;