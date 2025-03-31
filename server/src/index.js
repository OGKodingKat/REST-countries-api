import express from 'express'; //external module for using express
import pg from 'pg';
const { Client } = pg
import config from './config.js'; // internal module for connecting to our config file

let config = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT,
  ssl: true
}

const app = express();
const port = 3000;

app.use(express.json());


// PostgreSQL connection
const client = new Client(config);
client.connect();

// Helper functions
const createUser = async (name, email, country, bio) => {
  try {
    const result = await client.query(
      'INSERT INTO users (name, email, country, bio) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, country, bio]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const getUsers = async () => {
  try {
    const result = await client.query('SELECT * FROM users');
    return result.rows;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};

// Fetch all saved countries
const getSavedCountries = async () => {
  try {
    const result = await client.query('SELECT * FROM saved_countries');
    return result.rows;
  } catch (error) {
    console.error('Error fetching saved countries:', error);
    throw error;
  }
};

// Add a new country
const addSavedCountry = async (name, flag) => {
  try {
    const result = await client.query(
      'INSERT INTO saved_countries (name, flag) VALUES ($1, $2) RETURNING *',
      [name, flag]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error saving country:', error);
    throw error;
  }
};

const clickCountry = async (country) => {
  try {
    const result = await client.query(
      'INSERT INTO visit_counts (country_name, count) VALUES )($1, 1) ON CONFLICT (country_name) DO UPDATE SET count = visit_counts.count + 1 RETURNING count',
      [country]
    );
    await client.end();
    return result.rows[0].count;
  } catch (error) {
    console.error('Error updating visit count:', error);
    throw error;
  }
};

// API Endpoints

//Create a new user
app.post('/add-user', async (req, res) => {
  const { name, email, country, bio } = req.body;
  try {
    const user = await createUser(name, email, country, bio);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users' });
  }
});



// Get all saved countries
app.get('/saved-countries', async (req, res) => {
  try {
    const countries = await getSavedCountries();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving saved countries' });
  }
});


// API Endpoint: Get visit count
app.post('/visit-count', async (req, res) => {});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
