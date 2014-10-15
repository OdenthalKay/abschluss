'use strict';

var tutorials = require('../controllers/tutorials');

// Article authorization helpers
// var hasAuthorization = function(req, res, next) {
//   if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
//     return res.send(401, 'User is not authorized');
//   }
//   next();
// };

// The Package is past automatically as first parameter
module.exports = function(Tutorials, app, auth, database) {

      app.route('/tutorials')
      .get(tutorials.all)
      .post(tutorials.create); 
    app.route('/tutorials/:tutorialId')
      .get(tutorials.show)
      .put(tutorials.update)
      .delete(tutorials.destroy);

    app.param('tutorialId', tutorials.tutorial);

};
