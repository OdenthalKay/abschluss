'use strict';


 var mongoose = require('mongoose'),
 Comment = mongoose.model('Comment');
 //_ = require('lodash');


exports.comment= function(req, res, next, id) {
  console.log('exports.comment');
  req.comment = req.tutorial.comments.id(id);
  next();
};

exports.show = function(req, res) {
 res.json(req.comment);
};

exports.all = function(req, res) {
  res.json(req.tutorial.comments);
};

exports.create = function(req, res) {
  var comment = new Comment(req.body); 
  req.tutorial.comments.push(comment);
  req.tutorial.save(function (err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the comment'
      });
    }
    res.json(comment);
  });
};


