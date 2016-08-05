/**
 * Created by bubble on 25.07.16.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'common',
    'persistence/backendless'
], function ($, _, Backbone, Common, Backendless) {
    var ItemView = Backbone.View.extend({
        tagName: 'li',
        template: _.template( $('#item-template').html() ),
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'visible', this.toggleVisible);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        toggleVisible: function () {
            this.$el.toggle(this.isHidden());
        },
        isHidden: function () {
            var isLiked = this.model.get('liked');
            return (
                (!isLiked && Common.libraryFilter === 'unliked')
                || (isLiked && Common.libraryFilter === 'liked'
                || Common.libraryFilter === 'all')
            );
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON() ) );
            return this;
        },
        events: {
            'click .zoom_like-bttn' : 'like',
            'click .delete-item' : 'clear'
        },
        clear: function(){
            var model = this.model.toJSON();
            console.log(model.title + " by " + model.author + " will be deleted");
            this.model.destroy();
        },
        like: function(){
            this.model.toggleLike();
        }
    });
    return ItemView;
});
