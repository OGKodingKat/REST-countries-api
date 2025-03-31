import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import importedCountryData from "../../data";
import "../App.css"; // Import your CSS file

export default function CountryPage() {
  const { country } = useParams();
  const [fetchedCountryData, setFetchedCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visitCount, setVisitCount] = useState(0);

  // this page needs to be updated to post to the server
  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      if (country) {
        fetch(`https://restcountries.com/v3.1/name/${country}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
          }})
          .then((data) => {
            setFetchedCountryData(data[0]); // Assign fetched country data
            setLoading(false);
          })
          .catch(() => {
            const fallback = importedCountryData.find(
              (c) => c.name.common.toLowerCase() === country.toLowerCase()
            );
            setFetchedCountryData(fallback);
            setLoading(false);
          });

        // Handle visit count
        fetch(`http://localhost:${port}/visit-count/${country}`)
          .then((res) => res.json())
          .then((data) => setVisitCount(data.count))
          .catch((error) => console.error('Error fetching visit count:', error));

        fetch('http://localhost:${port}/visit-count', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country }),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to update visit count. Status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            if (data && typeof data.count === 'number') {
              setVisitCount(data.count);
            } else {
              console.error('Unexpected response format:', data);
            }
          })
          .catch((error) => console.error('Error updating visit count:', error));
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(debounceFetch);
  }, [country]);
    
    return (
      <div>
        {!loading && <h2>Visit Count for {country}</h2>}
        {!loading && <p>Visits: {visitCount}</p>}
      </div>
    );
  }

  const handleSave = () => {
    if (!fetchedCountryData) return;

    const savedCountries = JSON.parse(localStorage.getItem("savedCountries")) || [];

    // Check if the country is already saved to avoid duplicates
    if (!savedCountries.some((c) => c.name === fetchedCountryData.name.common)) {
      const updatedCountries = [
        ...savedCountries,
        {
          name: fetchedCountryData.name.common,
          flag: fetchedCountryData.flags.svg,
          capital: fetchedCountryData.capital?.[0] || "N/A",
          region: fetchedCountryData.region,
          population: fetchedCountryData.population,
        },
      ];
      localStorage.setItem("savedCountries", JSON.stringify(updatedCountries));
      alert(`${fetchedCountryData.name.common} has been saved!`);
    } else {
      alert(`${fetchedCountryData.name.common} is already saved.`);
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
        <strong>Population:</strong> {fetchedCountryData.population.toLocaleString()}
      </p>
      <p>
        <strong>Visits:</strong> {visitCount}
      </p>

      <button className="save-btn" onClick={handleSave}>Save</button>
      <Link to="/savedcountry">
        <button className="back-btn">View Saved Countries</button>
      </Link>
    </div>
  );