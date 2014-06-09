/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
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
            return 'data/events/' + this.id + '.json';
        },

        sync: function(method, model, options){
            options.dataType = 'json';
            return Backbone.sync(method, model, options);
        }
    });

    return EventModel;
});
