import React from 'react';
import UserForm from '../custom-components/UserForm';
import { useState, useEffect } from 'react';

const API_URL = "https://rest-countries-api-5q0p.onrender.com";

//need to change this to post to the server
export default function SavedCountry() {
  const [savedCountries, setSavedCountries] = useState([]);

  useEffect(() => {
    const fetchSavedCountries = async () => {
      try {
        const response = await fetch('http://localhost:3000/saved-countries');

        if (!response.ok) throw new Error('Failed to fetch saved countries');
        const data = await response.json();
        setSavedCountries(data);
      } catch (error) {
        console.error('Error fetching saved countries:', error);
      }
    };
  
    fetchSavedCountries();
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
    <p>{country.country_name}</p>
  </li>
))}

        </ul>
      )}
    </div>
    <UserForm />
    </>
    
  );
}