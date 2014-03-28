/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var EventView = Backbone.View.extend({
        template: JST['app/scripts/templates/event.ejs'],

        initialize: function(options) {
            // @debug
            console.log(' --- initialize EventView with options:');
            $.mobile.loading('show');

            // empty content
            this.$el.empty();

            // watch render
            this.on('render', this.afterRender);

            // render content
            this.render(options);
        },

        render: function(options) {
            // @debug
            console.log(' --- render EventView ' + options.id);

            var dict = {'id': options.id};
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
