/*global define*/

define([
    'underscore',
    'backbone',
    'eventModel'
], function (_, Backbone, EventModel) {
    'use strict';

    var EventsCollection = Backbone.Collection.extend({

        model: EventModel,

        url: 'data/events.json',

        success: function() {
            console.log("JSON file load was successful");
        },
        error: function(){
            console.log('There was some error in loading and processing the JSON file');
        },

        sync: function(method, model, options){
            // @debug
            console.log(' --- EventsCollection sync');
            options.dataType = 'json';
            return Backbone.sync(method, model, options);
        }
    });

    return EventsCollection;
});
