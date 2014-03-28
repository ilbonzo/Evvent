/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var HomeView = Backbone.View.extend({

        template: JST['app/scripts/templates/home.ejs'],

        initialize: function() {
            // @debug
            console.log(' --- initialize HomeView');
            $.mobile.loading('show');

            // empty content
            this.$el.empty();

            // watch render
            this.on('render', this.afterRender);

            // render content
            this.render();
        },

        render: function() {
            // @debug
            console.log(' --- render HomeView');

            var dict = {'appName': 'Evvent App Demo'};
            var html = this.template(dict);

            // set content
            this.$el.html(html);

            // trigger render for initialize watch
            this.trigger('render');
        },

        // after render content do this
        afterRender: function() {
            $.mobile.loading('hide');
        }

    });

    return HomeView;
});
