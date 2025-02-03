import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import countryData from "../../data";
import "../App.css"; // Import your CSS file

export default function CountryPage() {
  const  countryName  = useParams().country;
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (countryName) {
        console.log(countryName)
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((res) => res.json())
        .then((data) => setCountry(data[0]))
        .catch(() => {
          const fallback = countryData.find(
            (c) => c.name.common.toLowerCase() === countryName.toLowerCase()
          );
          setCountry(fallback);
        });}
    
  }, [countryName]);

  if (!country) return <p>Loading...</p>;

  return (
    <div className="country-container">
      <img className="country-flag" src={country.flags.svg} alt="Country Flag" />
      <h2>{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>

      <button className="save-btn">Save</button>
      <Link to="/">
        <button className="back-btn">Back</button>
      </Link>
    </div>
  );
}
