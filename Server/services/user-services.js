'use strict';
const mongoose = require('mongoose'),
    User = mongoose.model('User');
/**
 * Saves the new user object.
 *
 * @param user
*/
exports.save = (user) => {
    // const newUser = new User(user);
    return user.save();
};
/**
 * Gets the logged in user object. using id
 *
 * @param id
*/
exports.get = (id) => {
    return User.findById(id);
};