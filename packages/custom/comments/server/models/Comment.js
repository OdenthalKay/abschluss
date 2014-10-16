'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CommentSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String
  },
  link: {
    type: String
  }
});

mongoose.model('Comment', CommentSchema);
