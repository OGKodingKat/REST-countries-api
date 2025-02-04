import React from 'react';
import UserForm from '../custom-components/UserForm';
import { useState, useEffect } from 'react';

export default function SavedCountry() {
  const [savedCountries, setSavedCountries] = useState([]);

  useEffect(() => {
    // Retrieve saved countries from localStorage
    const storedCountries = JSON.parse(localStorage.getItem("savedCountries")) || [];
    setSavedCountries(storedCountries);
  }, []);


  return (
    <>
    <div className="saved-countries-container">
      <h2>Saved Countries</h2>
      
      {savedCountries.length === 0 ? (
        <p>No countries saved yet.</p>
      ) : (
        <ul className="saved-country-list">
          {savedCountries.map((country, index) => (
            <li key={index} className="saved-country-item">
              <img src={country.flag} alt={`${country.name} flag`} className="saved-country-flag" />
              <p>{country.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
    <UserForm />
    </>
    
  );
}