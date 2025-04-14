import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import countryData from "../../data";
import "../App.css"; // Import your CSS file

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





  const handleSave = async () => {
    if (!fetchedCountryData) return;
  
    const user_id = 1; // 🔁 Replace this with your actual user's ID
  
    try {
      const response = await fetch('http://localhost:3000/add-savedcountry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          country_name: fetchedCountryData.name.common,
        }),
      });
  
      if (!response.ok) throw new Error('Failed to save country');
  
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