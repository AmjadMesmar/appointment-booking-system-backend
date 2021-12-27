/* eslint-disable no-unused-vars */
'use strict';
const client = require('../../models/db');
// This Middleware will check if the user is a seller or not before authorizing:

function sellerCheck(req, res, next) {
  try {

    if (req.user.is_seller) {
      next();
    } else {
      res.status(403).send('User unauthorized, access denied!');
      next();
    }
  }
  catch (error) {
    res.status(403).send(error.message);
  }

}

module.exports = {
  sellerCheck,
};
