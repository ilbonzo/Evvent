/*global define*/

define([
    'underscore',
    'backbone',
    'eventModel',
    'config'
], function (_, Backbone, EventModel, Config) {
    'use strict';

    var EventsCollection = Backbone.Collection.extend({

        model: EventModel,

        // @local
        // url: 'data/events.json',
        // @songkick
        url: Config.url + 'events.json?location=geo:' + Config.lat + ',' + Config.lon + '&' + 'apikey=' + Config.apiKey + '&jsoncallback=?',

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
        },

        // for @songkick
        parse : function(response, options) {
            var self = this;
            var results = [];
            _.each(response.resultsPage.results.event, function(item) {
                var e = {
                    'id': item.id,
                    'title': item.displayName,
                    'date': item.start.date,
                    'image': 'nin.jpg'
                };
                results.push(e);
            });
            console.log(results);
            return results;
        }
    });

    return EventsCollection;
});
