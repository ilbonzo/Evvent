/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'eventModel'
], function ($, _, Backbone, JST, EventModel) {
    'use strict';

    var EventView = Backbone.View.extend({
        template: JST['app/scripts/templates/event.ejs'],

        initialize: function(options) {
            // @debug
            console.log(' --- initialize EventView with options:');
            $.mobile.loading('show');

            // empty content
            this.$el.empty();

            // get element model
            this.on('render', this.afterRender);
            this.model = new EventModel({id: options.id});
            this.model.on('sync', this.render, this);
            this.model.fetch();
        },

        render: function(options) {
            // @debug
            console.log(' --- render EventView ' + options.id);

            var dict = this.model.toJSON();
            // @debug
            console.log(' --- dict');
            console.log(dict);

            var html = this.template(dict);

            // set content
            this.$el.html(html);

            // trigger render for initialize watch
            this.trigger('render');
        },

        // after render content do this
        afterRender: function() {
            // @debug
            console.log(' --- afterRender EventView ');

            $.mobile.loading('hide');
        }
    });

    return EventView;
});
