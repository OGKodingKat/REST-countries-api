CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE saved_countries (
    save_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    country_name VARCHAR(100) NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE country_counts (
    country_name VARCHAR(100) PRIMARY KEY,
    save_count INT DEFAULT 0
);

INSERT INTO users (username, email) VALUES
('katmarie', 'kat@example.com'),
('devguy', 'dev@example.com'),
('coderchick', 'coder@example.com');

INSERT INTO saved_countries (user_id, country_name) VALUES
(1, 'Japan'),
(1, 'France'),
(2, 'Germany'),
(2, 'Japan'),
(3, 'Brazil'),
(3, 'Japan');

INSERT INTO country_counts (country_name, save_count) VALUES
('Japan', 3),
('France', 1),
('Germany', 1),
('Brazil', 1);

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

INSERT INTO saved_countries (user_id, country_name) 
VALUES ((SELECT user_id FROM users WHERE username = 'katmarie'), 'Italy');

UPDATE country_counts 
SET save_count = save_count + 1 
WHERE country_name = 'Italy';

-- If the country is not already in the country_counts table, insert it
INSERT INTO country_counts (country_name, save_count)
SELECT 'Italy', 1
WHERE NOT EXISTS (SELECT 1 FROM country_counts WHERE country_name = 'Italy');

SELECT users.username 
FROM users 
JOIN saved_countries ON users.user_id = saved_countries.user_id 
WHERE saved_countries.country_name = 'Japan';
