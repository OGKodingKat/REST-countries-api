import express from 'express'; //external module for using express
import pg from 'pg';
const { Client } = pg
import config from './config.js'; // internal module for connecting to our config file

// let config = {
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.DATABASE_PORT,
//   ssl: true
// }

const app = express();
const port = 3000;

app.use(express.json());


// PostgreSQL connection
const client = new Client(config);
client.connect();

// API Endpoint: Create a new user
// This function inserts a new user into the database
// using the provided user data.
async function addUser(userData) {
  const client = new Client(config);
  await client.connect();
  await client.query(`INSERT INTO users (name, email, country, bio) VALUES ('${userData.name}', '${userData.email}', '${userData.country}', '${userData.bio}')`);
  await client.end();
}
//Create a new user
app.post('/add-user', async (req, res) => {
 await addUser (req.body);
 res.send('User added');
});

// API Endpoint: Get all users
// This function fetches all users from the database
// and returns them as a JSON response.
async function getAllUsers() {
  const client = new Client(config);
  await client.connect();
  const result = await client.query(`SELECT * FROM users`);
  await client.end();
  return result.rows;
}

//Get all users
app.get('/get-all-users', async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
})

async function getSavedCountries() {
  const client = new Client(config);
  await client.connect();
  const result = await client.query(`SELECT * FROM saved_countries`);
  await client.end();
};

app.get('/saved-countries', async (req, res) => {
  const countries = await getSavedCountries();
  res.send('Countries fetched');
});

async function addSavedCountry(countryData) {
  const client = new Client(config);
  await client.connect();
  console.log(countryData);
  await client.query(`INSERT INTO saved_countries (user_id, country_name) VALUES ('${countryData.user_id}', '${countryData.country_name}')`);
  await client.end();
};

app.post('/add-savedcountry', async (req, res) => {
  await addSavedCountry(req.body);
  res.send('Country added');
});

//debug this endpoint
app.get('/clickCount/:country', async (req, res) => {
 const count = await getClickCount(req.params.country);
 res.send(count);
})

async function getClickCount(country) {
  const client = new Client(config);
  await client.connect();
  const result = await client.query(`SELECT * FROM visit_counts WHERE country_name = $1`, [country]);
  await client.end();
  return result.rows[0];
}


app.post("/country-clicked/:country", async (req, res) => {
  let country = req.params.country;
  let click = await updateClick(country);
  let JSONclick = JSON.stringify(click);
  res.send(JSONclick);
});

async function updateClick(country) {
  const client = new Client(config);
  await client.connect();
  const result = await client.query(
    `INSERT INTO visit_counts (country_name, count) 
  VALUES ($1, 1)
  ON CONFLICT (country_name) 
  DO UPDATE SET count = visit_counts.count + 1 WHERE visit_counts.country_name = $1
  RETURNING count`,
    [country]
  );
  await client.end();
  console.log(result);
  return result.rows[0].count;
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
