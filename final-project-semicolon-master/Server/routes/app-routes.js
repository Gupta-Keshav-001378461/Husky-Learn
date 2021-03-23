'use strict';

const userController = require('../controllers/user-controller');
const profileController = require('../controllers/profile-controller');
const articleController = require('../controllers/article-controller');
const auth = require('./auth');

//API's for routing toa specified request
module.exports = (app) => {
    app.route('/users')
        .post(userController.save);
    app.route('/users/login')
        .post(userController.login);
    app.route('/user')
        .get(auth.required,userController.get)
        .put(auth.required,userController.update);
    app.route('/profiles/:username')
        .get(auth.optional,profileController.getProfile);
    app.route('/profiles/:username/follow')
        .post(auth.required,profileController.follow)
        .delete(auth.required,profileController.unfollow);
    app.route('/articles')
        .post(auth.required,articleController.save)
        .get(auth.optional,articleController.getArticles);
    // app.route('/articles?author=:username')
        // .get(auth.optional,articleController.getArticles);
    app.route('/articles/feed')
        .get(auth.required,articleController.getFeed)
    app.route('/articles/:slug')
        .get(auth.optional,articleController.get)
        .put(auth.required,articleController.update)
        .delete(auth.required,articleController.delete);
    app.route('/articles/:slug/favorite')
        .post(auth.required,articleController.favorite)
        .delete(auth.required,articleController.unfavorite);
    app.route('/articles/:slug/comments')
        .post(auth.required,articleController.comment)
        .get(auth.optional,articleController.allComment);
    app.route('/articles/:slug/comments/:id')    
        .delete(auth.required,articleController.deleteComment);
    app.route('/tags')
        .get(auth.optional,articleController.getTagList);



    app.use(function (err, req, res, next) {
        if (err.name === 'ValidationError') {
            return res.status(422).json({
                errors: Object.keys(err.errors).reduce(function (errors, key) {
                    errors[key] = err.errors[key].message;        
                    return errors;
                }, {})
            });
        }
        return next(err);
    });
}