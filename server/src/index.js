import express from 'express';
import pg from 'pg';
import config from './config.js';
import cors from 'cors';

const { Client } = pg;
const app = express();
// Default port for the server
const defaultPort = 4000;

app.use(cors());
app.use(express.json());

// Add user
app.post('/add-user', async (req, res) => {
  const client = new Client(config);
  await client.connect();
  await client.query(`INSERT INTO users (name, email, country, bio) VALUES ($1, $2, $3, $4)`, 
    [req.body.name, req.body.email, req.body.country, req.body.bio]);
  await client.end();
  res.json({ message: 'User added' });
});

// Get all users
app.get('/get-all-users', async (req, res) => {
  const client = new Client(config);
  await client.connect();
  const result = await client.query(`SELECT * FROM users`);
  await client.end();
  res.json(result.rows);
});

// Get saved countries
app.get('/saved-countries', async (req, res) => {
  const client = new Client(config);
  await client.connect();
  const result = await client.query(`SELECT * FROM saved_countries`);
  await client.end();
  res.json(result.rows);
});

// Add a saved country
app.post('/add-savedcountry', async (req, res) => {
  const client = new Client(config);
  await client.connect();
  await client.query(`INSERT INTO saved_countries (user_id, country_name) VALUES ($1, $2)`, 
    [req.body.user_id, req.body.country_name]);
  await client.end();
  res.json({ message: 'Country added' });
});

// Click count logic
app.get('/clickCount/:country', async (req, res) => {
  const client = new Client(config);
  await client.connect();
  const result = await client.query(`SELECT * FROM visit_counts WHERE country_name = $1`, [req.params.country]);
  await client.end();
  res.json({ count: result.rows[0]?.count || 0 });
});

app.post("/country-clicked/:country", async (req, res) => {
  const client = new Client(config);
  await client.connect();
  const result = await client.query(
    `INSERT INTO visit_counts (country_name, count) 
     VALUES ($1, 1)
     ON CONFLICT (country_name) 
     DO UPDATE SET count = visit_counts.count + 1 
     WHERE visit_counts.country_name = $1
     RETURNING count`,
    [req.params.country]
  );
  await client.end();
  res.json({ count: result.rows[0].count });
});

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use(cors({
  origin: ['http://localhost:3000', 'delightful-cactus-01fc41.netlify.app'],
  methods: ['GET', 'POST'],
}));



const port = process.env.PORT || defaultPort;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


