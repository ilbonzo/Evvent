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
        jquerymobile: '../bower_components/jquery-mobile-bower/js/jquery.mobile-1.4.2'
    }
});

require([
    'backbone', 'jquerymobile'
], function (Backbone) {
    Backbone.history.start();
});
