'use strict';

// The Package is past automatically as first parameter
module.exports = function(Slideshowplayer, app, auth, database) {

  app.get('/slideshowplayer/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/slideshowplayer/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/slideshowplayer/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/slideshowplayer/example/render', function(req, res, next) {
    Slideshowplayer.render('index', {
      package: 'slideshowplayer'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
