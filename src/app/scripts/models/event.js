/*global define*/

define([
    'underscore',
    'backbone',
    'config'
], function (_, Backbone, Config) {
    'use strict';

    var EventModel = Backbone.Model.extend({
        defaults: {
            id: '',
            title: '',
            date: '',
            image: ''
        },

        urlRoot: 'data/events',

        url: function () {
            // @local
            // return 'data/events/' + this.id + '.json';
            // @songkick
            return Config.url + 'events/' + this.id + '.json?apikey=' + Config.apiKey + '&jsoncallback=?';
        },

        sync: function(method, model, options){
            options.dataType = 'json';
            return Backbone.sync(method, model, options);
        },

        // for @songkick
        parse : function(response, options) {
            var item = response.resultsPage.results.event;
            item.imgsize = 4;
            var e = {
                'id': item.id,
                'title': item.displayName,
                'date': item.start.date,
                'url': item.uri,
                'image': 'http://www2.sk-static.com/images/media/profile_images/events/' + item.id + '/col' + item.imgsize
            };
            return e;
        }

    });

    return EventModel;
});
