'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
SlideshowSchema = mongoose.model('Slideshow').schema; // Models können immer so abgeholt werden, keine dependency zwischen packages notwendig

var TutorialSchema = new Schema({
  name: {
  	type: String
  },
  slideshows: [SlideshowSchema]
});

mongoose.model('Tutorial', TutorialSchema);
