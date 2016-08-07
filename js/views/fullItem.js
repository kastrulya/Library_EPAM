/**
 * Created by bubble on 07.08.16.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../templates/FullItemView.html'
], function ($, _, Backbone, template) {
    var FullItemView = Backbone.View.extend({
        template: _.template(template),
        initialize: function () {
            console.log('Full Item View: ' + this.model.title);
        },
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });
    return FullItemView;
});