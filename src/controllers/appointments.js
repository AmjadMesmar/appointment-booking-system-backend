'use strict';

const { createAppointment, getAllAppointments, getUserAppointments, getAppointmentsDetails, updateAppointment, deleteAppointment } = require('../models/appointments');
const {getsellerData} = require ('../auth/models/user');
// This handler is used to create a new Appointment:

let createAppointmentHandler = async (req, res, next) => {
  try {
    let sellerData = await getsellerData(req.body.seller_name);
    await createAppointment(sellerData.id, req.user.user_name, req.body);
    res.status(200).json({
      status: 200,
      message: 'Appointment created successfully',
    });
  } catch (e) {
    next(e);
  }
};

// This handler is used to get all Appointments for admins only:

let getAllAppointmentsHandler = async (req, res, next) => {
  try {
    let allAppointments = await getAllAppointments();
    let count = allAppointments.length;
    res.status(200).json({count,allAppointments});
  } catch (e) {
    next(e);
  }
};

// This handler is used to get user's Appointments:

let getUserAppointmentsHandler = async (req, res, next) => {
  try {
    let allAppointments = await getUserAppointments(req.user.user_name);
    let count = allAppointments.length;
    res.status(200).json({count,allAppointments});
  } catch (e) {
    next(e);
  }
};

// This handler is used to get a Appointment details:

let getAppointmentDetailsHandler = async (req, res, next) => {
  try {
    let Appointment = await getAppointmentsDetails(req.params.appointment_id);
    res.status(200).json({Appointment});
  } catch (e) {
    next(e);
  }
};

// This handler is used to edit Appointment's details:

let updateAppointmentHandler = async (req, res, next) => {
  try {
    await updateAppointment(req.params.appointment_id, req.body);
    res.status(200).json('Appointment updated successfully!');
  } catch (e) {
    next(e);
  }
};

// This handler is used to delete a Appointment:

let deleteAppointmentHandler = async (req, res, next) => {
  try {
    await deleteAppointment(req.params.appointment_id);
    res.status(200).json('Appointment deleted successfully!');
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createAppointmentHandler,
  getAllAppointmentsHandler,
  getUserAppointmentsHandler,
  getAppointmentDetailsHandler,
  updateAppointmentHandler,
  deleteAppointmentHandler,
};