'use strict';

const client = require('../../models/db');

const bcrypt = require('bcrypt');

// This function is used for creating a new user:

async function createUser(data) {
  try {
    // Checking if the regesting user is a seller type to enter the right query:

    let isSeller = data.is_seller;
    let SQL = isSeller ? `INSERT INTO USERS (user_name,hashed_password,email,is_seller) VALUES ($1,$2,$3,$4) RETURNING *;` : `INSERT INTO USERS (user_name,hashed_password,email) VALUES ($1,$2,$3) RETURNING *;`;

    data.password = await bcrypt.hash(data.password, 10);
    let user = data.user_name.toLowerCase().trim(); // make user_name a lower case.
    let email = data.email.toLowerCase().trim(); // make email a lower case.

    let safeValues = isSeller ? [user, data.password, email, isSeller] : [user, data.password, email];
    let usernameQuery = await client.query(SQL, safeValues);

    if(isSeller) {
      let userData = await getUser(user);
      createSeller(userData.id,userData.user_name);
    }

    return usernameQuery.rows[0];

  } catch (e) {
    throw new Error(e.message);
  }
}

// This function is used for changing user password:

async function updateUserPassword(user_id, user_password) {
  try {
    const hashed_password = await bcrypt.hash(user_password, 10);
    const SQL = `UPDATE USERS SET hashed_password = $1 WHERE id = $2 RETURNING *;`;

    const safeValues = [hashed_password, user_id];
    const result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
}

// This function is used to  get user information:

async function getUser(username) {
  try {
    let SQL = `SELECT * FROM USERS WHERE user_name=$1`;
    let checkUsername = [username];
    let usernameQuery = await client.query(SQL, checkUsername);
    return usernameQuery.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
}

// This function is used to get user information using email or user_name:

async function getUserByEmail(email, username = '') {
  try {
    let SQL = `SELECT * FROM USERS WHERE email=$1;`;
    let emailCheck = [email];
    if (username && username != '') {
      SQL = `SELECT * FROM USERS WHERE email=$1 OR user_name=$2;`;
      emailCheck = [email, username];
    }
    let userEmailQuery = await client.query(SQL, emailCheck);

    return userEmailQuery.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
}

// This function is used to get user information using id:

async function getUserById(id) {
  try {
    let usernameQuery;
    let SQL = `SELECT * FROM USERS WHERE id=$1`;
    let checkId = [id];
    usernameQuery = await client.query(SQL, checkId);

    return usernameQuery.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getAllUsers() {
  try {
    let SQL = `SELECT * FROM USERS`;
    let usernameQuery = await client.query(SQL);

    return usernameQuery.rows;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getUserDetails(userId) {
  try {
    let SQL = `SELECT * FROM USERS WHERE id=$1`;
    let safeValues = [userId];
    let usernameQuery = await client.query(SQL, safeValues);

    return usernameQuery.rows;
  } catch (e) {
    throw new Error(e.message);
  }
}

// Creating a new Seller:

async function createSeller(userID,sellerName) {
  try {

    let SQL = `INSERT INTO SELLER (user_id,seller_name) VALUES ($1,$2) RETURNING *;`;

    let safeValues = [userID,sellerName];
    let usernameQuery = await client.query(SQL, safeValues);
    return usernameQuery.rows[0];

  } catch (e) {
    throw new Error(e.message);
  }
}

//Get all Sellers:

async function getAllSellers() {
  try {
    let SQL = `SELECT * FROM SELLER;`;
    let sellerQuery = await client.query(SQL);

    return sellerQuery.rows;
  } catch (e) {
    throw new Error(e.message);
  }
}

// Get seller id using the seller's name:
async function getsellerData(sellerName) {
  try {
    let SQL = `SELECT * FROM SELLER WHERE seller_name=$1`;
    let safeValues = [sellerName];
    let sellerQuery = await client.query(SQL, safeValues);

    return sellerQuery.rows[0];
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = { createUser, getUser, getUserById, getUserByEmail, updateUserPassword, getAllUsers, getUserDetails, createSeller, getAllSellers, getsellerData };
