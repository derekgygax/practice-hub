-- This has the relations with the REFERENCES
-- With references if its to the primary key you don't need to explicitly state it but i like to
-- One to One for organizers to users
-- Many to many for events to users and events to tags - NEED LINKING TABLES!!!
-- one to many for events to locations
--  and more but these are important
-- Cities table
CREATE TABLE cities (name VARCHAR(200) PRIMARY KEY);
-- Locations table
CREATE TABLE locations (
  -- id INT PRIMARY KEY AUTO_INCREMENT,
  id SERIAL PRIMARY KEY,
  title VARCHAR(300),
  street VARCHAR(300) NOT NULL,
  house_number VARCHAR(10) NOT NULL,
  postal_code VARCHAR(5) NOT NULL,
  -- This is the relationship way
  -- The relationship here forces you to always use a city
  -- that is already in the cities table
  -- This doesn't allow for the city name to be delted in the cities table and if the city name is changed in cities, change it here too
  city_name VARCHAR(200) REFERENCES cities (name) ON DELETE RESTRICT ON UPDATE CASCADE
);
-- Users table
CREATE TABLE users (
  -- id INT PRIMARY KEY AUTO_INCREMENT,
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(300) NOT NULL,
  last_name VARCHAR(300) NOT NULL,
  birthdate DATE NOT NULL,
  email VARCHAR(300) NOT NULL
);
-- Organizers
CREATE TABLE organizers (
  password VARCHAR(500) NOT NULL,
  user_id INT PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE
);
-- Tags Table
CREATE TABLE tags (name VARCHAR(100) PRIMARY KEY);
-- Events table
CREATE TABLE events (
  -- id INT PRIMARY KEY AUTO_INCREMENT,
  id SERIAL PRIMARY KEY,
  name VARCHAR(300) NOT NULL CHECK (CHAR_LENGTH(name) > 5),
  date_planned TIMESTAMP NOT NULL,
  image VARCHAR(300),
  description TEXT NOT NULL,
  max_participants INT CHECK (max_participants > 0),
  min_age INT CHECK (min_age > 0),
  -- cascade delete
  location_id INT REFERENCES locations (id) ON DELETE CASCADE,
  -- if organizer dissapears, erase the event
  organizer_id INT REFERENCES organizers (user_id) ON DELETE CASCADE
);
-- Events Users linking table
-- Many to Many relationships
-- Primary Key that does more than one column
CREATE TABLE events_users (
  event_id INT REFERENCES events (id) ON DELETE CASCADE,
  user_id INT REFERENCES users (id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, user_id)
);
-- Events to Tags Linking Table
CREATE TABLE events_tags (
  event_id INT REFERENCES events (id) ON DELETE CASCADE,
  tag_name VARCHAR(100) REFERENCES tags (name) ON DELETE CASCADE,
  PRIMARY KEY (event_id, tag_name)
)