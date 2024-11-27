
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Landing from "./pages/landing/landing.js";
import UserHome from "./pages/userhome/userhome.js";
import CompatibilityTest from './pages/compatibilitytest/compatibilitytest.js';
import NavBar from "./components/navbar/navbar.js"


function App() {
  return (
    <div className="app-container">
      <div className = "main-content">
        <Routes>
          <Route path= "/" element = {<Landing />} />
          <Route path = "/home" element = {<UserHome />} />
          <Route path = "/compatibility" element = {<CompatibilityTest />} />
        </Routes>
      </div>


    </div>
  );
}

export default App;
