'use strict';

const express = require('express');
const router = express.Router();
const {createAppointmentHandler,getAllAppointmentsHandler,getUserAppointmentsHandler,getAppointmentDetailsHandler,updateAppointmentHandler,deleteAppointmentHandler} = require('../controllers/appointments');
const bearer = require('../auth/middlewares/bearer');

// Global middleware bearer authentication
router.use(bearer);

// Appointment Routes
router.post('/appointments',createAppointmentHandler);
router.get('/appointments',getAllAppointmentsHandler);
router.get('/appointments/user', getUserAppointmentsHandler);
router.get('/appointments/:appointment_id', getAppointmentDetailsHandler);
router.put('/appointments/:appointment_id', updateAppointmentHandler);
router.delete('/appointments/:appointment_id',deleteAppointmentHandler);




// Test route
router.get('/test', (req,res)=>{
  res.send('working well');
});

module.exports = router;
