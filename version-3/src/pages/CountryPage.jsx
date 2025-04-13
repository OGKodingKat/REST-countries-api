import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";
import countryData from "../../data";
import "../App.css";

export default function CountryPage() {
  const { country } = useParams();
  const [fetchedCountryData, setFetchedCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
          const currentCountry = data.find(
            (countryData) =>
              countryData.name.common.toLowerCase() === country.toLowerCase()
          );
          setFetchedCountryData(currentCountry);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error.message);
          setFetchedCountryData(countryData);
        });
    };

    fetchData();
  }, [country]);

  // 🔥 Firebase Visit Count Logic
  useEffect(() => {
    const updateVisitCount = async () => {
      const countryRef = doc(db, "visitCounts", country.toLowerCase());

      try {
        const docSnap = await getDoc(countryRef);

        if (docSnap.exists()) {
          // Increment existing count
          await updateDoc(countryRef, {
            count: increment(1),
          });
          setVisitCount(docSnap.data().count + 1);
        } else {
          // First visit
          await setDoc(countryRef, { count: 1 });
          setVisitCount(1);
        }
      } catch (error) {
        console.error("Error updating visit count:", error);
      }
    };

    if (country) updateVisitCount();
  }, [country]);

  // 🔥 Firebase Save Country Logic
  const handleSave = async () => {
    if (!fetchedCountryData) return;

    const user_id = "user_1"; // Replace with real user ID or auth-based ID

    try {
      const savedCountriesRef = collection(db, "savedCountries");

      // Optional: prevent duplicates
      const q = query(
        savedCountriesRef,
        where("user_id", "==", user_id),
        where("country_name", "==", fetchedCountryData.name.common)
      );
      const existing = await getDocs(q);

      if (!existing.empty) {
        alert("This country is already saved.");
        return;
      }

      await addDoc(savedCountriesRef, {
        user_id,
        country_name: fetchedCountryData.name.common,
      });

      alert(`${fetchedCountryData.name.common} has been saved!`);
    } catch (error) {
      console.error("Error saving country:", error);
      alert("There was a problem saving this country.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!fetchedCountryData) return <p>Country not found.</p>;

  return (
    <div className="country-container">
      <img
        className="country-flag"
        src={fetchedCountryData.flags.svg}
        alt={`${fetchedCountryData.name.common} Flag`}
      />
      <h2>{fetchedCountryData.name.common}</h2>
      <p>
        <strong>Capital:</strong> {fetchedCountryData.capital?.[0] || "N/A"}
      </p>
      <p>
        <strong>Region:</strong> {fetchedCountryData.region}
      </p>
      <p>
        <strong>Population:</strong>{" "}
        {fetchedCountryData.population.toLocaleString()}
      </p>
      <p>
        {visitCount !== null
          ? `Visited ${visitCount} time${visitCount !== 1 ? "s" : ""}.`
          : "Loading visit count..."}
      </p>

      <button className="save-btn" onClick={handleSave}>
        Save
      </button>
      <Link to="/savedcountry">
        <button className="back-btn">View Saved Countries</button>
      </Link>
    </div>
  );
}
