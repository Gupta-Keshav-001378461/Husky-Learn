'use strict';

const  userService= require('./../services/user-services');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');

/**
 * Creates a new user and sets the response.
 *
 * @param request
 * @param response
*/
//creates a new user 
exports.save = (request, response ,next) => {
    
    var user = new User();

    user.username = request.body.user.username;
    user.email = request.body.user.email;
    user.setPassword(request.body.user.password);
  
    userService.save(user).then(function(){
      return response.json({user: user.toAuthJSON()});
    }).catch(next);
};

/**
 * login user sets the response.
 *
 * @param request
 * @param response
*/
//login user
exports.login = (req, res ,next) => {
    
    if(!req.body.user.email){
      return res.status(422).json({errors: {email: "can't be blank"}});
    }
  
    if(!req.body.user.password){
      return res.status(422).json({errors: {password: "can't be blank"}});
    }
  
    passport.authenticate('local', {session: false}, function(err, user, info){
      if(err){ return next(err); }
  
      if(user){
        user.token = user.generateJWT();
        return res.json({user: user.toAuthJSON()});
      } else {
        return res.status(422).json(info);
      }
    })(req, res, next);
  };
  /**
 * get logged in user sets the response.
 *
 * @param request
 * @param response
*/
//get logged in user
exports.get = (req, res ,next) => {
    userService.get(req.payload.id).then(function(user){
       return res.json({user: user.toAuthJSON()});
    }).catch(next);
  };

  /**
 * get logged in user sets the response.
 *
 * @param request
 * @param response
*/
//get logged in user
exports.update = (req, res ,next) => {
    userService.get(req.payload.id).then(function(user){
      if(!user){ return res.sendStatus(401); } 
      // only update fields that were actually passed...
      if(typeof req.body.user.username !== 'undefined'){
        user.username = req.body.user.username;
      }
      if(typeof req.body.user.email !== 'undefined'){
        user.email = req.body.user.email;
      }
      if(typeof req.body.user.bio !== 'undefined'){
        user.bio = req.body.user.bio;
      }
      if(typeof req.body.user.image !== 'undefined'){
        user.image = req.body.user.image;
      }
      if(typeof req.body.user.password !== 'undefined'){
        user.setPassword(req.body.user.password);
      }
      
      userService.save(user).then(function(){
        return res.json({user: user.toAuthJSON()});
      }).catch(next);
  
    }).catch(next);
  };