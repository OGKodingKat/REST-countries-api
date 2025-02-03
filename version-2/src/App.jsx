import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SavedCountry from './pages/SavedCountry.jsx';
import CountryPage from './pages/CountryPage.jsx';
import UserForm from './custom-components/UserForm.jsx';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCwDxtdjMyDcsqLAO3GyJioIgO2Gjk7wsE",
  authDomain: "country-api-3043a.firebaseapp.com",
  projectId: "country-api-3043a",
  storageBucket: "country-api-3043a.firebasestorage.app",
  messagingSenderId: "297463227591",
  appId: "1:297463227591:web:96fe6d47c94fbad3c68ae2",
  measurementId: "G-HB0HKML5WR"
};


function App() {

  const app = initializeApp(firebaseConfig);
console.log(app);
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Where in the World?</Link>
          </li>
          <li>
            <Link to="/savedcountry">Saved Country</Link>
          </li>
          <li>Dark Mode</li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<UserForm />} />
        <Route path="/savedcountry" element={<SavedCountry />} />
        <Route path="/countrypage/:country" element ={<CountryPage />} />
      </Routes>
    </div>
  );
}

export default App;
