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

  /*
  Das globale user-Objekt wird jetzt nicht mehr hier gesetzt, sondern über die
  Route '/users/me'. Diese wird per http-GET aufgerufen, wenn home-view (= index.html) geöffnet wird.
  */
  res.render('index', {
    modules: modules,
    isAdmin: isAdmin,
    adminEnabled: isAdmin() && mean.moduleEnabled('mean-admin')
  });
};
