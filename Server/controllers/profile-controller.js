'use strict';

const  profileService= require('./../services/profile-services');
const mongoose = require('mongoose');
const User = mongoose.model('User');
/**
 * get userprofile sets the response.
 *
 * @param request
 * @param response
*/
//get userprofile  
exports.getProfile = (req, res ,next) => {

    retriveUser(req,callback)
    function callback(){
        if(req.payload){
            profileService.get(req.payload.id).then(function(user){
              if(!user){
                return res.json({profile:req.profile.toProfileJSONFor(false)});
              }
              return res.json({profile: req.profile.toProfileJSONFor(user)});
            });
          }else{
            return res.json({profile: req.profile.toProfileJSONFor(false)});
          } 
    }
};
/**
 * follow user sets the response.
 *
 * @param request
 * @param response
*/
exports.follow = (req, res ,next) => {
    retriveUser(req,callback);

    function callback(){
        var profileId = req.profile._id;
  
        profileService.get(req.payload.id).then(function(user){
          if (!user) { return res.sendStatus(401); }
      
          return user.follow(profileId).then(function(){
            return res.json({profile: req.profile.toProfileJSONFor(user)});
          });
        }).catch(next);
    }
};
/**
 * unfollow user sets the response.
 *
 * @param request
 * @param response
*/
exports.unfollow = (req, res ,next) => {
    retriveUser(req,callback);

    function callback(){
        var profileId = req.profile._id;
  
        profileService.get(req.payload.id).then(function(user){
            if (!user) { return res.sendStatus(401); }
  
            return user.unfollow(profileId).then(function(){
              return res.json({profile: req.profile.toProfileJSONFor(user)});
            });
        }).catch(next);
    }
};
//Retrieve user usign username  
function retriveUser(req,next){
    profileService.find(req.params.username).then(function(user){
        if (!user) { return res.sendStatus(404); }
        req.profile = user;
        return next();
      }).catch(next);
}