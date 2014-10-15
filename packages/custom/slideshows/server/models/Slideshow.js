'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SlideshowSchema = new Schema({
  name: {
    type: String
  }
});

mongoose.model('Slideshow', SlideshowSchema);
