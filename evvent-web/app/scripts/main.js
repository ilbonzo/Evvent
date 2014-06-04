/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        jquerymobile: {
            deps: [
                'jquery'
            ],
            exports: 'jqm'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        jquerymobile: '../bower_components/jquery-mobile-bower/js/jquery.mobile-1.4.2',

        // routers
        'appRouter': 'routes/appRouter',

        // views
        'homeView': 'views/home',
        'eventView': 'views/event',
        'eventsView': 'views/events',

        // models
        'eventModel': 'models/event',

        // collections
        'eventsCollection': 'collections/events'
    }
});

require([
    'backbone', 'appRouter'
], function (Backbone, AppRouter) {

    $(document).on( 'mobileinit',
        // Set up the "mobileinit" handler before requiring jQuery Mobile's module
        function() {
            // Prevents all anchor click handling including the addition of active button state and alternate link bluring.
            $.mobile.linkBindingEnabled = false;

            // Disabling this will prevent jQuery Mobile from handling hash changes
            $.mobile.hashListeningEnabled = false;

        }
    )
    // after disable jquerymobile route active backbone
    require( ['jquerymobile'], function() {
        window.appRouter = new AppRouter();
    });

});
