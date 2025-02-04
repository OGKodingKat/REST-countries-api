import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import countryData from "../../data";
import "../App.css"; // Import your CSS file

export default function CountryPage() {
  const { country } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    if (country) {
      fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((res) => res.json())
        .then((data) => {
          setCountryData(data[0]); // Assign fetched country data
          setLoading(false);
        })
        .catch(() => {
          const fallback = countryData.find(
            (c) => c.name.common.toLowerCase() === country.toLowerCase()
          );
          setCountryData(fallback);
          setLoading(false);
        });

      // Handle visit count
      const storedCounts = JSON.parse(localStorage.getItem("visitCounts")) || {};
      const newCount = (storedCounts[country] || 0) + 1;
      storedCounts[country] = newCount;
      localStorage.setItem("visitCounts", JSON.stringify(storedCounts));
      setVisitCount(newCount);
    }
  }, [country]);

  const handleSave = () => {
    if (!countryData) return;

    const savedCountries = JSON.parse(localStorage.getItem("savedCountries")) || [];

    // Check if the country is already saved to avoid duplicates
    if (!savedCountries.some((c) => c.name === countryData.name.common)) {
      const updatedCountries = [
        ...savedCountries,
        {
          name: countryData.name.common,
          flag: countryData.flags.svg,
          capital: countryData.capital?.[0] || "N/A",
          region: countryData.region,
          population: countryData.population,
        },
      ];
      localStorage.setItem("savedCountries", JSON.stringify(updatedCountries));
      alert(`${countryData.name.common} has been saved!`);
    } else {
      alert(`${countryData.name.common} is already saved.`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!countryData) return <p>Country not found.</p>;

  return (
    <div className="country-container">
      <img
        className="country-flag"
        src={countryData.flags.svg}
        alt={`${countryData.name.common} Flag`}
      />
      <h2>{countryData.name.common}</h2>
      <p>
        <strong>Capital:</strong> {countryData.capital?.[0] || "N/A"}
      </p>
      <p>
        <strong>Region:</strong> {countryData.region}
      </p>
      <p>
        <strong>Population:</strong> {countryData.population.toLocaleString()}
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
}
