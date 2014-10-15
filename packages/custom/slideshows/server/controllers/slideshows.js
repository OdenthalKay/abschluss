'use strict';


/*
Slideshows ist ein Subdocument von Tutorials.
=> Slideshows wird automatsich gespeichert, wenn das Parentdocument (= req.tutorial) gespeichert wird
*/


var mongoose = require('mongoose'),
Slideshow = mongoose.model('Slideshow'),
_ = require('lodash');

exports.slideshow = function(req, res, next, id) {
  req.slideshow = req.tutorial.slideshows.id(id);
  next();
};

exports.show = function(req, res) {
 console.log(req.slideshow);
 res.json(req.slideshow);
};

exports.all = function(req, res) {
  res.json(req.tutorial.slideshows);
};

exports.create = function(req, res) {
  var slideshow = new Slideshow(req.body); 
  req.tutorial.slideshows.push(slideshow);
  req.tutorial.save(function (err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the slideshow'
      });
    }
    res.json(slideshow);
  });
};


exports.destroy = function(req, res) {
  var slideshow = req.slideshow;
  var id = req.params.slideshowId;
  req.tutorial.slideshows.id(id).remove();

  req.tutorial.save(function (err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the tutorial after removing the slideshow'
      });
    }
    res.json(slideshow);
  });
};

exports.update = function(req, res) {
  var slideshow = req.slideshow;

  slideshow = _.extend(slideshow, req.body);
  req.tutorial.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the slideshow'
      });
    }
    res.json(slideshow);
  });
};






