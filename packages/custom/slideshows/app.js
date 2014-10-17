'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Slideshows = new Module('slideshows');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Slideshows.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Slideshows.routes(app, auth, database);

  
  
  Slideshows.aggregateAsset('css', 'slideshows.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Slideshows.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Slideshows.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Slideshows.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Slideshows;
});
