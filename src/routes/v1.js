'use strict';

const express = require('express');
const router = express.Router();
const {createAppointmentHandler,getAllAppointmentsHandler,getUserAppointmentsHandler,getAppointmentDetailsHandler,updateAppointmentHandler,deleteAppointmentHandler} = require('../controllers/appointments');
const bearer = require('../auth/middlewares/bearer');

// Global middleware bearer authentication
router.use(bearer);

// Appointment Routes
router.post('/appointments',createAppointmentHandler); // Book a new appointment
router.get('/appointments',getAllAppointmentsHandler); // Get all appointments
router.get('/appointments/user', getUserAppointmentsHandler); // Get all user's appointments
router.get('/appointments/:appointment_id', getAppointmentDetailsHandler); // Get an appointment's details
router.put('/appointments/:appointment_id', updateAppointmentHandler); // Update an appointment's status
router.delete('/appointments/:appointment_id',deleteAppointmentHandler); // Delete an appointment




// Test route
router.get('/test', (req,res)=>{
  res.send('working well');
});

module.exports = router;
