CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  mobile VARCHAR(15) NOT NULL,
  password VARCHAR(255) NOT NULL -- Password field added, usually we store hashed passwords
);

SELECT * FROM users;

-- Drop the users table if it exists
DROP TABLE IF EXISTS users;

-- Create the users table with the password column
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  mobile VARCHAR(15) NOT NULL,
  password VARCHAR(255) NOT NULL -- Password field added for hashed passwords
);

CREATE TABLE otp_codes (
  id SERIAL PRIMARY KEY,
  mobile VARCHAR(15) NOT NULL,
  otp INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;

DROP TABLE IF EXISTS otp_codes;

CREATE TABLE otp_codes (
    id SERIAL PRIMARY KEY,
    phone_number VARCHAR(15) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM otp_codes;

-- Drop the users table if it exists
DROP TABLE IF EXISTS users;

-- Create the users table with the password column
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  mobile VARCHAR(15) NOT NULL,
  password VARCHAR(255) NOT NULL -- Password field added for hashed passwords
);

-- Drop the otp_codes table if it exists
DROP TABLE IF EXISTS otp_codes;

-- Create the otp_codes table with mobile field
CREATE TABLE otp_codes (
  id SERIAL PRIMARY KEY,
  mobile VARCHAR(15) NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test data to ensure everything is working
SELECT * FROM users;
SELECT * FROM otp_codes;

-- Drop the otp_codes table if it exists
DROP TABLE IF EXISTS otp_codes;

-- Create the otp_codes table with mobile field
CREATE TABLE otp_codes (
  id SERIAL PRIMARY KEY,
  mobile VARCHAR(15) NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Check the contents of otp_codes table
SELECT * FROM otp_codes;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS otp_codes;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  mobile VARCHAR(15) NOT NULL,
  password VARCHAR(255) NOT NULL -- Password field added for hashed passwords
);

SELECT * FROM users;

-- Appointment Bookings Table
CREATE TABLE appointment_bookings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    vehicle_type VARCHAR(50),
    vehicle_number VARCHAR(50),
    service_type VARCHAR(255),
    branch VARCHAR(255),
    date DATE NOT NULL,
    time TIME NOT NULL
);

SELECT * FROM appointment_bookings;

DROP TABLE IF EXISTS appoinment_bookings;

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  mobile VARCHAR(15),
  vehicle_type VARCHAR(50),
  vehicle_number VARCHAR(20),
  service_type VARCHAR(255),
  branch VARCHAR(255),
  date DATE,
  time TIME,
  status VARCHAR(50) DEFAULT 'ongoing'
);

INSERT INTO bookings (name, mobile, vehicle_type, vehicle_number, service_type, branch, date, time, status)
VALUES ('John Doe', '0712345678', 'SUV', 'AB-1234', 'Full Service', 'Branch 1', '2024-12-10', '10:00:00', 'ongoing');

SELECT * FROM bookings;

DROP TABLE IF EXISTS bookings;

-- Appointment Bookings Table
CREATE TABLE appointment_bookings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    vehicle_type VARCHAR(50),
    vehicle_number VARCHAR(50),
    service_type VARCHAR(255),
    branch VARCHAR(255),
    date DATE NOT NULL,
    time TIME NOT NULL
);

SELECT * FROM appointment_bookings;