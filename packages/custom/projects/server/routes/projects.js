'use strict';

var projects = require('../controllers/projects');

// The Package is past automatically as first parameter
module.exports = function(Projects, app, auth, database) {

      app.route('/tutorials/:tutorialId/projects')
      //.get(projects.all)
      .post(projects.create); 
    //app.route('/tutorials/:tutorialId/projects/:projectId')
      //.get(slideshows.show)
      //.put(slideshows.update)
      //.delete(slideshows.destroy);

    //app.param('projectId', projects.project);
};
