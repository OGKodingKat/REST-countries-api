import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import countryData from "../../data";
import "../App.css"; // Import your CSS file

const API_URL = "https://rest-countries-api-5q0p.onrender.com";

export default function CountryPage() {
  const { country } = useParams();
  const [fetchedCountryData, setFetchedCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visitCount, setVisitCount] = useState(null);
  console.log(country, "COUNTRY")
  useEffect(() => {
    const fetchData = () => {
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
          const currentCountry = data.find((countryData) => countryData.name.common.toLowerCase() === country.toLowerCase());
          setFetchedCountryData(currentCountry);
          console.log("Current Country:", currentCountry);
          setLoading(false);

        })
        .catch((error) => {
          console.error("Error:", error.message);
          setFetchedCountryData(countryData);

        });
    };
    fetchData();
  }, []);


  // this page needs to be updated to post to the server
  useEffect(() => {
    const updateClick = async (country) => {
      console.log(`/country-clicked/${country}`);
      await fetch(`http://localhost:3000/country-clicked/${country}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country }),
      });
      
    };

    const getCount = async (country) => {
      const response = await fetch(`http://localhost:3000/clickCount/${country}`);
      const data = await response.json();
      console.log("Fetched visit count:", data);
      setVisitCount(data.count); // Access the count property
    };

    getCount(country);
    updateClick(country);
  }, [country]);


  useEffect(() => {
    if (visitCount != null && fetchedCountryData != null) setLoading(false);
  }, [visitCount, fetchedCountryData]);

  // visit count pseudo code
  // visit count needs to upodate on every visit 
  // get"fetch" the visit count for the country display to user
  // visit count needs to be updated"post" for the database
  // increment the visit count by 1





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
  {visitCount !== null ? `Visited ${visitCount} time${visitCount !== 1 ? "s" : ""}.` : "Loading visit count..."}
</p>



      <button className="save-btn" onClick={handleSave}>Save</button>
      <Link to="/savedcountry">
        <button className="back-btn">View Saved Countries</button>
      </Link>
    </div>
  );
}