DROP TABLE IF EXISTS APPOINTMENT;
DROP TABLE IF EXISTS JWT;
DROP TABLE IF EXISTS SELLER;
DROP TABLE IF EXISTS USERS;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE USERS(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_name VARCHAR(100) UNIQUE,
  hashed_password VARCHAR(250) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  is_seller BOOLEAN DEFAULT FALSE,
  created_at timestamp not null default current_timestamp
);

CREATE TABLE JWT(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  access_token VARCHAR(250) NOT NULL,
  refresh_token VARCHAR(250) NOT NULL,
  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (user_id) REFERENCES USERS(id)
);

CREATE TABLE SELLER(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  seller_name VARCHAR(100) UNIQUE,
  created_at timestamp not null default current_timestamp,
  FOREIGN KEY (user_id) REFERENCES USERS(id)
);

CREATE TABLE APPOINTMENT(
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  seller_id uuid NOT NULL,
  buyer_name VARCHAR(250),
  appointment_description TEXT,
  appointment_status VARCHAR(250) NOT NULL DEFAULT 'PENDING',
  created_at timestamp not null default current_timestamp
);