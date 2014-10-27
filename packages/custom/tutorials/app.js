'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Tutorials = new Module('tutorials');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Tutorials.register(function(app, auth, database, slideshows) {

  //We enable routing. By default the Package Object is passed to the routes
  Tutorials.routes(app, auth, database, slideshows);

    //We are adding a link to the main menu for all authenticated users
  Tutorials.menus.add({
    title: 'Tutorials',
    link: 'tutorials',
    roles: ['authenticated'],
    menu: 'main'
  });


  
  Tutorials.aggregateAsset('css', 'tutorials.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Tutorials.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Tutorials.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Tutorials.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Tutorials;
});
