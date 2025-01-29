const userProfiles = [
    {
        fullName: "katmarie",
        email: "katmarie@example.com",
        country: "United States",
        bio: "Frontend Engineer passionate about coding and design.",
    },
    {
        fullName: "lilianast",
        email: "liliana@example.com",
        country: "Poland",
        bio: "Aspiring data analyst with a knack for visualization.",
    },

];
const savedCountries = [
    {
        fullName: "katmarie",
        countries: ["Japan", "Canada", "Australia"],
    },
    {
        fullName: "lilianast",
        countries: ["France", "Germany", "Italy"],
    },

];
const countryViews = [
    {
        country: "United States",
        views: 15,
    },
    {
        country: "Japan",
        views: 25,
    },
    {
        country: "Canada",
        views: 10,
    },

];

function addUserProfile(fullName, email, country, bio) {
    userProfiles.push({ fullName, email, country, bio });
}
addUserProfile("New User", "newuser@example.com", "Brazil", "Traveler and foodie.");

function addSavedCountry(fullName, country) {
    const user = savedCountries.find((user) => user.fullName === fullName);
    if (user) {
        if (!user.countries.includes(country)) {
            user.countries.push(country);
        }
    } else {
        savedCountries.push({ fullName, countries: [country] });
    }
}
addSavedCountry("Kat Marie", "Mexico");
