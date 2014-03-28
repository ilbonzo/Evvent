/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'eventModel',
    'eventsCollection'
], function ($, _, Backbone, JST, EventModel, EventsCollection) {
    'use strict';

    var EventsView = Backbone.View.extend({
        template: JST['app/scripts/templates/events.ejs'],

        initialize: function() {
            // @debug
            console.log(' --- initialize EventsView');
            $.mobile.loading('show');

            // empty content
            this.$el.empty();

            // watch render
            this.on('render', this.afterRender);

            this.collection = new EventsCollection();
            this.collection.on('sync', this.render, this);
            // @debug
            console.log(' --- EventsView ');

            this.collection.fetch();
        },

        render: function() {
            // @debug
            console.log(' --- render EventsView');

            var dict = {'eventsCollection': this.collection.toJSON()};
            var html = this.template(dict);

            // set content
            this.$el.html(html);

            // reload listview jqm
            $('ul.dynamic').listview();

            // trigger render for initialize watch
            this.trigger('render');
        },

        // after render content do this
        afterRender: function() {
            $.mobile.loading('hide');
        }
    });

    return EventsView;
});
