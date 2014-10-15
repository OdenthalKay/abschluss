'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Slideshoweditor = new Module('slideshoweditor');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Slideshoweditor.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Slideshoweditor.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Slideshoweditor.menus.add({
    title: 'slideshoweditor example page',
    link: 'slideshoweditor example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Slideshoweditor.aggregateAsset('css', 'slideshoweditor.css');
  Slideshoweditor.aggregateAsset('css', 'slideshow.css');
  Slideshoweditor.aggregateAsset('css', 'color-palette.css');
  Slideshoweditor.aggregateAsset('css', 'scrollable-slide-list.css');
  Slideshoweditor.aggregateAsset('css', 'action-bar.css');
  Slideshoweditor.aggregateAsset('js', 'kinetic-v5.1.0.min.js', {global:true});

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Slideshoweditor.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Slideshoweditor.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Slideshoweditor.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Slideshoweditor;
});
