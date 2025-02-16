import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import ReactGA from "react-ga4";
import AnalyticsTracker from "./components/AnalyticsTracker";

function App() {
  const userdata = localStorage.getItem("user");
  const [user, setUser] = useState(userdata);

  useEffect(() => {
    ReactGA.initialize("G-MRECKQME6M");
  }, []);

  return (
    <Router>
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={!user ? <Home /> : <Navigate to="/welcome" />} />
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/welcome" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/welcome" />} />
        <Route path="/welcome" element={user ? <Welcome user={user} setUser={setUser} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
