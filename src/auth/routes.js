'use strict';

const express = require('express');
const authRouter = express.Router();

const authenticateBasic = require('./middlewares/basic');
const authenticateBearer = require('./middlewares/bearer');
const { signUpHandler, signInHandler, signoutHandler, refreshHandler, updateUserPasswordHandler, getAllUsersHandler,getUserHandler, getAllSellersHandler, getSellerByNameHandler } = require('./controllers/authControllers');


// Routes
authRouter.post('/signup', signUpHandler);
authRouter.post('/signin', authenticateBasic, signInHandler);
authRouter.get('/signout', authenticateBearer, signoutHandler);
authRouter.get('/users', authenticateBearer,getAllUsersHandler);
authRouter.get('/users/sellers', authenticateBearer,getAllSellersHandler);
authRouter.get('/users/sellers/:sellerName', authenticateBearer,getSellerByNameHandler);
authRouter.get('/user', authenticateBearer,getUserHandler);
authRouter.post('/refresh', refreshHandler);
authRouter.put('/user/password', authenticateBearer, updateUserPasswordHandler);


authRouter.get('/test', authenticateBearer, (req, res, next) => {
  try {
    res.json(req.user);
  } catch (e) {
    next(e.message);
  }
});

module.exports = authRouter;
