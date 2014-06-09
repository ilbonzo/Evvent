/*global define*/

define([
    'jquery',
    'backbone',
    'homeView',
    'eventsView',
    'eventView'
], function ($, Backbone, HomeView, EventsView, EventView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        // The Router constructor
        initialize: function() {
            // Tells Backbone to start watching for hashchange events
            // Backbone.history.start({pushState: true});
            Backbone.history.start();
        },

        routes: {
            '': 'home',
            'events': 'events',
            'events/:id': 'getEvent'
        },

        // Home method
        home: function() {
            // @debug
            console.log(' --- home route');
            var home = new HomeView({'el': '#content'});
        },

        // events method
        events: function() {
            // @debug
            console.log(' --- events route');
            var events = new EventsView({'el': '#content'});
        },

        // event method
        getEvent: function(id) {
            console.log(id);
            // @debug
            console.log(' --- getEvent route');
            var eventView = new EventView({'el': '#content', 'id': id});
        }

    });


    return AppRouter;
});
