-- create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  email varchar(255) not null unique,   -- make email field non-case sensitive and unique
  password varchar(255) not null
);

-- create itineraries table that contains itinerary belonging to a user
CREATE TABLE IF NOT EXISTS itineraries (
  id SERIAL PRIMARY KEY,
  u_id integer not null,
  name varchar(255),
  start_date date,
  end_date date
);

-- create itinerary_days table that contains a reference of days in each itinerary
CREATE TABLE IF NOT EXISTS itinerary_days (
  id SERIAL PRIMARY KEY,
  i_id integer not null
);

-- create day_card table that contains itinerary data of a single day in a single itinerary
CREATE TABLE IF NOT EXISTS day_card (
  id SERIAL PRIMARY KEY,
  d_id integer not null,
  start_at time,
  end_at time,
  image varchar(255),
  location text not null,
  description text
)
