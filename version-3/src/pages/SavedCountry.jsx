import React, { useState, useEffect } from 'react';
import UserForm from '../custom-components/UserForm';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function SavedCountry() {
  const [savedCountries, setSavedCountries] = useState([]);

  useEffect(() => {
    const fetchSavedCountries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'countries'));
        const countryList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSavedCountries(countryList);
      } catch (error) {
        console.error('Error fetching countries from Firestore:', error);
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
                <p>{country.country_name || country.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <UserForm />
    </>
  );
}
