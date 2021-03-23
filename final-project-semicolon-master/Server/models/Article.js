const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slug = require('slug'); // package to auto create URL slugs
const User = mongoose.model('User');

const ArticleSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},// Generating unique string to each article for database lookups
  title: String,
  description: String,
  body: String,
  favoritesCount: {type: Number, default: 0},
  tagList: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
},

{timestamps: true});

//Unique validator for Articles
ArticleSchema.plugin(uniqueValidator, {message: 'is already taken'});

//Generating unique article slugs
ArticleSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

//Invoke slugify method before Mongoose validation
ArticleSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

//Articles Schema return
ArticleSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user)
  };
};

ArticleSchema.methods.updateFavoriteCount = function() {
  let article = this;

  return User.count({favorites: {$in: [article._id]}}).then(function(count){
    article.favoritesCount = count;

    return article.save();
  });
};

mongoose.model('Article', ArticleSchema);

