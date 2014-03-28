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
            date: ''
        }
    });

    return EventModel;
});
