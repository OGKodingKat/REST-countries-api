import '../App.css'
import { Card, Image } from "@chakra-ui/react"
import { Routes, Route, Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
//TODO: add a click handler to the card that will log the country name to the console
  function handleClick() {
    console.log("Country card clicked");
  }
  return (
    <Link onClick={handleClick()} to={`/countrypage/${country.name.common}`}>
    <Card.Root className="card" maxW="sm" overflow="hidden">
      <Image src={country.flags.svg}></Image>
      <Card.Title>{country.name.common}</Card.Title>
      <Card.Description>Population:{country.population}</Card.Description>
      <Card.Description>Region: {country.region}</Card.Description>
      <Card.Description>Capital: {country.capital}</Card.Description>
    </Card.Root>
    </Link>
  );
};

export default CountryCard;