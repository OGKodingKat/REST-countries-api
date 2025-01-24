import { useParams } from "react-router-dom";
import countryData from "../../data";

export default function CountryPage() {
console.log(useParams())
const params = useParams();
const country = params.country;
console.log(params);
    return <p>country: {country}</p>
    
}
