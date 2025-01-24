import CountryCard from "../custom-components/CountryCard";
import countryData from '../../data';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);


  const fetchData = () => {
    fetch(
      "https://restcountries.com/v3.1/all"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        console.log(data)
      })

      .catch((error) => {
        setError('Error:' + error.message)
        setData(countryData)
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className='cardwrp'>
        {data.map((country) => (
          <CountryCard country={country}></CountryCard>
        ))}
      </div>
      <h1>Welcome to the Home Page</h1>

    </>
  )

}
