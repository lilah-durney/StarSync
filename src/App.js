
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Landing from "./pages/landing/landing.js";

function App() {
  return (
    <div className="app-container">
      <div className = "main-content">
        <Routes>
          <Route path= "/" element = {<Landing />} />
        </Routes>
      </div>


    </div>
  );
}

export default App;
