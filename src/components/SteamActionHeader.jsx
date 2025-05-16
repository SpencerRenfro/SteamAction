import vacuum from '../assets/vacuum.png';

function SteamActionHeader() {
    return (
      <div className="flex items-center gap-2 text-4xl font-bold">
        <span
          className="bg-gradient-to-r from-red-600 via-pink-500 to-blue-700 bg-clip-text text-transparent"
        >
          Steam
        </span>
        <span className="text-blue-900">Action</span>
        <img src={vacuum} alt="Vacuum" className="h-10 w-auto" />
      </div>
    );
  }
  
  export default SteamActionHeader;
  