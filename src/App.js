
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Landing from "./pages/landing/landing.js";
import UserHome from "./pages/userhome/userhome.js";
import CompatibilityTest from './pages/compatibilitytest/compatibilitytest.js';
import NavBar from "./components/navbar/navbar.js"
import Login from "./pages/login/login.js";
import InputProfile from "./pages/inputprofile/inputprofile.js";
import Signup from "./pages/signup/signup.js";
import PasswordReset from "./pages/passwordreset/passwordreset.js"


function App() {
  return (
    <div className="app-container">
      <NavBar />
      <div className = "main-content">
        <Routes>
          <Route path= "/" element = {<Landing />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/signup" element = {<Signup />} />
          <Route path = "/passwordreset" element = {<PasswordReset />} />
          <Route path = "/userhome" element = {<UserHome />} />
          <Route path = "/inputprofile" element = {<InputProfile />} />
          <Route path = "/compatibility" element = {<CompatibilityTest />} />

        </Routes>
      </div>


    </div>
  );
}

export default App;
