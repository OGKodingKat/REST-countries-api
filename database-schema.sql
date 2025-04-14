CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    country VARCHAR(50) NOT NULL,
    bio VARCHAR(150)
);

CREATE TABLE saved_countries (
    save_id SERIAL PRIMARY KEY,
    user_id INT,
    country_name VARCHAR(100) NOT NULL
);

CREATE TABLE visit_counts (
    country_id SERIAL PRIMARY KEY,
    country_name VARCHAR(100) UNIQUE NOT NULL,
    count INT DEFAULT 1
);

INSERT INTO users (name, email, country, bio) VALUES
('katmarie', 'kat@example.com', 'Berlin', 'poop'),
('devguy', 'dev@example.com', 'Germany', 'giggle'),
('coderchick', 'coder@example.com', 'Hungary', 'hungry');

INSERT INTO saved_countries (user_id, country_name) VALUES
(1, 'Japan'),
(1, 'France'),
(2, 'Germany'),
(2, 'Japan'),
(3, 'Brazil'),
(3, 'Japan');

INSERT INTO visit_counts (country_name, count) VALUES
('Japan', 3),
('France', 1),
('Germany', 1),
('Brazil', 1);

SELECT users.username 
FROM users 
JOIN saved_countries ON users.user_id = saved_countries.user_id 
WHERE saved_countries.country_name = 'Japan';

SELECT country_name, saved_at 
FROM saved_countries 
WHERE user_id = (SELECT user_id FROM users WHERE username = 'katmarie');

SELECT country_name, save_count 
FROM country_counts 
ORDER BY save_count DESC 
LIMIT 5;

SELECT * 
FROM saved_countries 
WHERE user_id = (SELECT user_id FROM users WHERE username = 'katmarie') 
AND country_name = 'Japan';