import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ServiceList from "./components/ServiceList";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <a href="https://vite.dev" target="_blank" className="mx-2">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="mx-2">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-8">SteamAction Cleaning Services</h1>

        <div className="my-8">
          <ServiceList />
        </div>

        <div className="card bg-base-200 p-4 max-w-md mx-auto">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="btn btn-primary"
          >
            count is {count}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
