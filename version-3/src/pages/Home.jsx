import React, { useEffect, useState } from "react";
import CountryCard from "../custom-components/CountryCard";
import countryData from "../../data";

export default function Home() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setData(countryData);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter countries based on search query
  const filteredData = data.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h1>Welcome to the Home Page</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="cardwrp">
        {filteredData.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </>
  );
}
