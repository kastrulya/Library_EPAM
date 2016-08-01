/**
 * Created by bubble on 25.07.16.
 */

var app = app || {};

app.ItemView = Backbone.View.extend({
    tagName: 'li',
    template: _.template( $('#item-template').html() ),
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'visible', this.toggleVisible)
    },
    toggleVisible: function () {
        this.$el.toggle(this.isHidden());
    },
    isHidden: function () {
        var isLiked = this.model.get('liked');
        return ( // hidden cases only
            (!isLiked && app.libraryFilter === 'unliked')
            || (isLiked && app.libraryFilter === 'liked')
        );
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON() ) );
        return this;
    },
    events: {
        'click .zoom_like-bttn' : 'like'
    },
    like: function(){
        this.model.toggleLike();
    }
});