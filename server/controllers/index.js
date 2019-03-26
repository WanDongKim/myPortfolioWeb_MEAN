    // Created index.js and added auth function(login, register, logout) as an API
    // FIle name: index.js
    // Name: Dongwan Kim
    // Student id: 300932262
    // Last modified: Mar 26th, 2019

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// define the User Model
let userModel = require("../models/user");
let User = userModel.User; 

// Process Login Function
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', 
    (err, user, info) => {
      // server error?
      if(err) {
        return next(err);
      }
      // is there a user login error?
      if(!user) {
        return res.json({success: false, msg: 'ERROR: Failed to Log In User!'});
      }
      req.logIn(user, (err) => {
        // server error?
        if(err) {
          return next(err);
        }
        const payload ={
          id:user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
  
        const authToken = jwt.sign(payload, DB.secret, {
          expiresIn: 604800 //1 week
        });
        return res.json({success: true, msg: 'User Logged in Successfully!', user:{
            id:user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }, token: authToken}); 
      });
    })(req, res, next);
  }

  //User reigistration API
module.exports.processRegisterPage = (req, res, next) => {
    // define a new user object
    let newUser = new User({
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });
  
    User.register(newUser, req.body.password, (err) => {
      if (err) {
        console.log("Error: Inserting New User");
        if (err.name == "UserExistsError") {
          console.log("Error: User Already Exists!");
        }
        return res.json({success: false, msg: 'ERROR: Failed to Register User!'});
      } else {
        // if no error exists, then registration is successful
  
        // redirect the user
        return passport.authenticate("local")(req, res, () => {
          return res.json({success: true, msg: 'User Registered Successfully!'});
        });
      }
    });
  };
  
  module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.json({success: true, msg: 'User Successfully Logged Out!'});
  };