'use strict';

const  userService= require('./../services/user-services');
const  articleService= require('./../services/article-services');
const  profileService= require('./../services/profile-services');
const commentService = require('./../services/comment-services');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Article = mongoose.model('Article');
const Comment = mongoose.model('Comment');
/**
 * save an article sets the response.
 *
 * @param req
 * @param res
 * @param next
*/
exports.save = (req, res ,next) => {
    userService.get(req.payload.id).then(function(user){
        if (!user) { return res.sendStatus(401); }
  
        let article = new Article(req.body.article);
    
        article.author = user;
         articleService.save(article).then(function () {
          return res.json({ article: article.toJSONFor(user) });
        });
    })

};

/**
 * get an article sets the response.
 *
 * @param req
 * @param res
 * @param next
*/
exports.get = (req, res ,next) => {
    retriveArticle(req,callback);
    function callback(){
        Promise.all([
            req.payload ? userService.get(req.payload.id) : null,
            req.article.populate('author').execPopulate()
          ]).then(function (results) {
            let user = results[0];
        
            return res.json({ article: req.article.toJSONFor(user) });
          }).catch(next);
    }
};

/**
 * update an article sets the response.
 *
 * @param req
 * @param res
 * @param next
*/
exports.update = (req, res ,next) => {
    retriveArticle(req,callback);
    function callback(){
        userService.get(req.payload.id).then(function (user) {
 
            if (req.article.author._id.toString() === req.payload.id.toString()) {
              if (typeof req.body.article.title !== 'undefined') {
                req.article.title = req.body.article.title;
              }
        
              if (typeof req.body.article.description !== 'undefined') {
                req.article.description = req.body.article.description;
              }
        
              if (typeof req.body.article.body !== 'undefined') {
                req.article.body = req.body.article.body;
              }
        
              articleService.save(req.article).then(function (article) {
                return res.json({ article: article.toJSONFor(user) });
              }).catch(next);
            } else {
              return res.sendStatus(403);
            }
          });
    }

};
/**
 * delete an article sets the response.
 *
 * @param req
 * @param res
 * @param next
*/
exports.delete = (req, res ,next) => {
  retriveArticle(req,callback);

  function callback(){
    userService.get(req.payload.id).then(function () {
      if (req.article.author._id.toString() === req.payload.id.toString()) {
        console.log("------------------------------------------");
        console.log(req.article)
        return articleService.delete(req.article._id).then(function () {
          return res.sendStatus(204);
        });
      } else {
        return res.sendStatus(403);
      }
    });

  } 
}
/**
 * favorite an article sets the response.
 *
 * @param req
 * @param res
 * @param next
*/
exports.favorite = (req, res ,next) => {
  retriveArticle(req,callback);

  function callback(){
    let articleId = req.article._id;

    userService.get(req.payload.id).then(function (user) {
      if (!user) { return res.sendStatus(401); }
  
      return user.favorite(articleId).then(function () {
        return req.article.updateFavoriteCount().then(function (article) {
          return res.json({ article: article.toJSONFor(user) });
        });
      });
    }).catch(next);

  } 
}

/**
 * unfavorite an article sets the response.
 *
 * @param req
 * @param res
 * @param next
*/
exports.unfavorite = (req, res ,next) => {
  retriveArticle(req,callback);

  function callback(){
    let articleId = req.article._id;

    userService.get(req.payload.id).then(function (user) {
      if (!user) { return res.sendStatus(401); }
  
      return user.unfavorite(articleId).then(function () {
        return req.article.updateFavoriteCount().then(function (article) {
          return res.json({ article: article.toJSONFor(user) });
        });
      });
    }).catch(next);
  } 
}


/**
 * comment over an article sets the response.
 *
 * @param req
 * @param res
 * @param next
*/
exports.comment = (req, res ,next) => {
  retriveArticle(req,callback);

  function callback(){
    let articleId = req.article._id;

    userService.get(req.payload.id).then(function (user) {
      if (!user) { return res.sendStatus(401); }
  
      let comment = new Comment(req.body.comment);
      comment.article = req.article;
      comment.author = user;
  
      commentService.save(comment).then(function () {
        req.article.comments.push(comment);
  
        articleService.save(req.article).then(function (article) {
          res.json({ comment: comment.toJSONFor(user) });
        });
      });
    }).catch(next);
  } 
}

/**
 * get all comments over an article.
 *
 * @param req
 * @param res
 * @param next
*/
exports.allComment = (req, res ,next) => {
  retriveArticle(req,callback);

  function callback(){
    Promise.resolve(req.payload ? userService.get(req.payload.id) : null)
    .then(function (user) {
      return req.article.populate({
        path: 'comments',
        populate: {
          path: 'author'
        },
        options: {
          sort: {
            createdAt: 'desc'
          }
        }
      }).execPopulate().then(function (article) {
        return res.json({
          comments: req.article.comments.map(function (comment) {
            return comment.toJSONFor(user);
          })
        });
      });
    }).catch(next);
  } 
}


/**
 * delete comment over an article sets the response.
 *
 * @param req
 * @param res
 * @param next
*/
exports.deleteComment = (req, res ,next) => {
  retriveArticle(req,callback1);

  function callback1(){
    retriveComment(req,callback2);
  } 
  function callback2(){
    if (req.comment.author.toString() === req.payload.id.toString()) {
      
      req.article.comments.remove(req.comment._id);
      req.article.save()
        .then(Comment.find({ _id: req.comment._id }).remove().exec())
        .then(function () {
          res.sendStatus(204);
        });
    } else {
      res.sendStatus(403);
    }
  }
}
exports.getFeed = (req, res ,next) => {
  var limit = 20;
  var offset = 0;

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset;
  }

  userService.get(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Promise.all([
      Article.find({ author: { $in: user.following == true ? user.following : null } })
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('author')
        .exec(),
      Article.count({ author: { $in: user.following == true ? user.following : null } })
    ]).then(function (results) {
      var articles = results[0];
      var articlesCount = results[1];

      return res.json({
        articles: articles.map(function (article) {
          return article.toJSONFor(user);
        }),
        articlesCount: articlesCount
      });
    }).catch(next);
  });
}

exports.getArticles = (req, res, next) =>{
  let query = {};
  let limit = 20; // number of articles to be returned, default 20
  let offset = 0; // number of articles to skip for query, default 0

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset;
  }

  // Filter articles by tags
  if (typeof req.query.tag !== 'undefined') {
    query.tagList = { "$in": [req.query.tag] };
  }


  // Filter articles by author and favoriter
  Promise.all([
    req.query.author ? profileService.find( req.query.author ) : null,
    req.query.favorited ? profileService.find( req.query.favorited ) : null
  ]).then(function (results) {
    let author = results[0];
    let favoriter = results[1];

    if (author) {
      query.author = author._id;
    }

    if (favoriter) {
      query._id = { $in: favoriter.favorites };
    } else if (req.query.favorited) {
      query._id = { $in: [] };
    }

    return Promise.all([
      Article.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({ createdAt: 'desc' })
        .populate('author')
        .exec(),
      Article.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function (results) {
      let articles = results[0];
      let articlesCount = results[1];
      let user = results[2];

      return res.json({
        articles: articles.map(function (article) {
          return article.toJSONFor(user);
        }),
        articlesCount: articlesCount
      });
    });
  }).catch(next);
}
//function to get taglist
exports.getTagList = (req, res ,next) => {
  Article.find().distinct('tagList').then(function (tags) {
  return res.json({ tags: tags });
 }).catch(next);
 };
//Retrieve article given slug 
function retriveArticle(req,next){
    articleService.find(req.params.slug)
    .populate('author')
    .then(function (article) {
      if (!article) { return res.sendStatus(404); }
      req.article = article;

      return next();
    }).catch(next);
}
//Retrieve comment given comment Id 
function retriveComment(req,next){
  commentService.get(req.params.id).then(function (comment) {
    if (!comment) { return res.sendStatus(404); }

    req.comment = comment;

    return next();
  }).catch(next);
}
