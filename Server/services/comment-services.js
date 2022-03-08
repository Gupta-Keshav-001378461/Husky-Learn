'use strict';
const mongoose = require('mongoose'),
    Comment = mongoose.model('Comment');
/**
 * Saves the new comment object.
 *
 * @param comment
*/
exports.save = (comment) => {
    // const newComment = new Comment(comment);
    return comment.save();
};

/**
 * Gets the comment using id
 *
 * @param id
*/
exports.get = (id) => {
    return Comment.findById(id);
};
exports.delete = (commentId) => {
    const promise = Comment.find({ _id: commentId }).remove().exec();
    return promise;
  };