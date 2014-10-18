'use strict';

var mean = require('meanio');

exports.render = function(req, res) {

  var modules = [];
  // Preparing angular modules list with dependencies
  for (var name in mean.modules) {
    modules.push({
      name: name,
      module: 'mean.' + name,
      angularDependencies: mean.modules[name].angularDependencies
    });
  }

  function isAdmin() {
    return req.user && req.user.roles.indexOf('admin') !== -1;
  }

  // Send some basic starting info to the view

  /*
  Hier müssen alle Eigenschaften gesetzt werden, die zur Laufzeit erreichbar sein sollen.
  => tutorialIds muss hier hinzugefügt werden, damit zur Laufzeit mittels '$scope.global.user' die Zugehörigkeit
     überprüft werden kann.
  */
  res.render('index', {
    user: req.user ? {
      name: req.user.name,
      _id: req.user._id,
      username: req.user.username,
      roles: req.user.roles,
      projectAnswers: req.user.projectAnswers,
      tutorialIds: req.user.tutorialIds
    } : {},
    modules: modules,
    isAdmin: isAdmin,
    adminEnabled: isAdmin() && mean.moduleEnabled('mean-admin')
  });
};
