import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SavedCountry from './pages/SavedCountry.jsx';
import CountryPage from './pages/CountryPage.jsx';


function App() {
  const API_URL = "https://rest-countries-api-5q0p.onrender.com";

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Where in the World?</Link></li>
          <li><Link to="/savedcountry">Saved Country</Link></li>
          <li>Dark Mode</li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/savedcountry" element={<SavedCountry />} />
        <Route path="/countrypage/:country" element={<CountryPage />} />
      </Routes>
    </div>
  );
}

export default App;
