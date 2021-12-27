'use strict';

const client = require('./db');

// Create a new appointment and add it to database:

async function createAppointment(sellerId, buyer_name, appointment) {
  try {
    let SQL = `INSERT INTO APPOINTMENT (seller_id,buyer_name,appointment_description) VALUES ($1, $2, $3) RETURNING *;`;

    let appointment_description = appointment.appointment_description;
    let safeValues = [sellerId, buyer_name, appointment_description];

    let createaAppointmentQuery = await client.query(SQL, safeValues);
    return createaAppointmentQuery.rows[0];

  }
  catch (error) {
    throw new Error(error);
  }


}

// Get all appointments from database:

async function getAllAppointments() {
  try {
    let SQL = `SELECT * FROM APPOINTMENT`;
    let createaAppointmentQuery = await client.query(SQL);
    return createaAppointmentQuery.rows;

  }
  catch (error) {
    throw new Error(error);
  }

}

// Get all appointments for a specific user:

async function getUserAppointments(userName) {
  try {
    let SQL = `SELECT * FROM APPOINTMENT WHERE buyer_name=$1`;
    let safeValues = [userName];
    let createaAppointmentQuery = await client.query(SQL, safeValues);
    return createaAppointmentQuery.rows;

  }
  catch (error) {
    throw new Error(error);
  }

}

// Get a appointment's details:

async function getAppointmentsDetails(appointmentId) {
  try {
    let SQL = `SELECT * FROM APPOINTMENT WHERE id=$1`;
    let safeValues = [appointmentId];
    let createaAppointmentQuery = await client.query(SQL, safeValues);
    return createaAppointmentQuery.rows[0];

  }
  catch (error) {
    throw new Error(error);
  }

}

// Edit appointment's information and update it into the databse:

async function updateAppointment(appointmentId, body) {
  try {
    let SQL = `UPDATE APPOINTMENT SET appointment_status=$1 WHERE id=$2;`;
    // let buyer_name = body.buyer_name;
    // let appointment_description = body.appointment_description;
    // let appointment_sector = body.appointment_sector;
    let appointment_status = body.appointment_status;
    let safeValues = [appointment_status, appointmentId];
    let createaAppointmentQuery = await client.query(SQL, safeValues);
    return createaAppointmentQuery;

  }
  catch (error) {
    throw new Error(error);
  }

}

// Delete a specific appointment:

async function deleteAppointment(appointmentId) {
  try {
    let SQL = `DELETE FROM APPOINTMENT WHERE id=$1;`;
    let safeValues = [appointmentId];
    let createaAppointmentQuery = await client.query(SQL, safeValues);
    return createaAppointmentQuery;

  }
  catch (error) {
    throw new Error(error);
  }

}



module.exports = {
  createAppointment,
  getAllAppointments,
  getUserAppointments,
  getAppointmentsDetails,
  updateAppointment,
  deleteAppointment,
};