/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
    baseUrl: 'js',

    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                //These script dependencies should be loaded before loading
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        backboneLocalstorage: {
            //These script dependencies should be loaded before loading
            deps: ['backbone'],
            exports: 'Store'
        }
    },
    paths: {
        jquery: '../node_modules/jquery/dist/jquery',
        underscore: '../node_modules/underscore/underscore',
        backbone: '../node_modules/backbone/backbone',
        backboneLocalstorage: '../node_modules/backbone.localstorage/backbone.localStorage',
        text: '../node_modules/text/text'
    }
});

require([
    'jquery',
    'backbone',
    'routers/router',
    'persistence/backendless'
], function ($, Backbone, LibraryRouters, Backendless) {
    /*jshint nonew:false*/
    Backendless.config();
    // Initialize routing and start Backbone.history()
    new LibraryRouters();
    Backbone.history.start();
});
