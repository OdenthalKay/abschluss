'use strict';

var slideshows = require('../controllers/slideshows');

// Article authorization helpers
// var hasAuthorization = function(req, res, next) {
//   if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
//     return res.send(401, 'User is not authorized');
//   }
//   next();
// };

// The Package is past automatically as first parameter
module.exports = function(Slideshows, app, auth, database) {

    // wird hier ':tutorialId' gesetzt, obwohl app.param in einem anderen package definiert wurde?
    app.route('/tutorials/:tutorialId/slideshows')
      .get(slideshows.all)
      .post(slideshows.create); 
    app.route('/tutorials/:tutorialId/slideshows/:slideshowId')
      .get(slideshows.show)
      .put(slideshows.update)
      .delete(slideshows.destroy);

    app.param('slideshowId', slideshows.slideshow);
};
