# Appointment booking system backend

## About

A REST Express API with Postgres SQL database, this server is used as a backend for a react app for appointments booking system.

**Author:**

Amjad Mesmar

---

## Setup

- `(.env)` file

`
PORT=5000
`

- Install the following dependencies

`
npm i express pg cors dotenv bcrypt base-64 jsonwebtoken uuid
`

---

## End-points

### Auth Routes

#### **Sign up:**

- **Method** : POST
  
`
http://localhost:5000/auth/signup
`

#### **Sign in:**

- **Method** : POST

`
http://localhost:5000/auth/signin
`

#### **Sign out:**

- **Method** : GET

`
http://localhost:5000/auth/signout
`

#### **Get all users:**

- **Method** : GET

`
http://localhost:5000/auth/users
`

#### **Get all sellers:**

- **Method** : GET

`
http://localhost:5000/auth/users/Sellers
`

#### **Get seller by name:**

- **Method** : GET

`
http://localhost:5000/auth/users/sellers/:sellerName
`

#### **Get user's details:**

- **Method** : GET
  
`
http://localhost:5000/auth/user
`

#### **Change user's password:**

- **Method** : PUT

`
http://localhost:5000/auth/user/password
`

#### **Refresh user's tokens:**

- **Method** : POST

`
http://localhost:5000/auth/refresh
`

---

### API V1 Routes

#### **Book a new appointment:**

- **Method** : POST

`
http://localhost:5000/api/v1/appointments
`

#### **Get all appointments:**

- **Method** : GET

`
http://localhost:5000/api/v1/appointments
`

#### **Get all user's appointments:**

- **Method** : GET

`
http://localhost:5000/api/v1/appointments/user
`

#### **Get an appointment's details:**

- **Method** : GET

`
http://localhost:5000/api/v1/appointments/:appointment_id
`

#### **Update an appointment's status:**

- **Method** : PUT

`
http://localhost:5000/api/v1/appointments/:appointment_id
`

#### **Delete an appointment:**

- **Method** : DELETE

`
http://localhost:5000/api/v1/appointments/:appointment_id
`
