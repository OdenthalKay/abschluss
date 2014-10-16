'use strict';

var comments = require('../controllers/comments');

// Article authorization helpers
// var hasAuthorization = function(req, res, next) {
//   if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
//     return res.send(401, 'User is not authorized');
//   }
//   next();
// };

// The Package is past automatically as first parameter
module.exports = function(Slideshows, app, auth, database) {
    app.route('/tutorials/:tutorialId/comments')
      .get(comments.all)
      .post(comments.create); 
    app.route('/tutorials/:tutorialId/comments/:commentId')
      .get(comments.show);

    app.param('commentId', comments.comment);
};