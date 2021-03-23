'use strict';
const mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Gets the user profile object. using id
 *
 * @param id
*/
exports.get = (id) => {
    return User.findById(id);
};
/**
 * Gets the user profile object. using username
 *
 * @param username
*/
exports.find = (username) => {
    return User.findOne({username: username});
};