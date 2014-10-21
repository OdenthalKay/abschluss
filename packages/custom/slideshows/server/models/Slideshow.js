'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


 var SlideSchema = new Schema({
 	jsonData : {
 		type: String
 	},
 	imageData: {
 		type: String
 	}
 });

var SlideshowSchema = new Schema({
  name: {
    type: String
  },
  slides: [SlideSchema]
});

mongoose.model('Slideshow', SlideshowSchema);
