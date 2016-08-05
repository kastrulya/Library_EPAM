/**
 * Created by bubble on 25.07.16.
 */

define([
    'underscore', 
    'backbone'
], function (_, Backbone) {
    var Item = Backbone.Model.extend({
        defaults: {
            title : '',
            description: '',
            author: '',
            liked: false,
            countLikes: 0
        },
        idAttribute: "objectId",
        toggleLike: function(){
            var currState = this.get('liked');
            var likeAffect = currState? -1 : 1;
            this.save({
                liked: !this.get('liked'),
                countLikes: currState + likeAffect
            });
        }
    });
    return Item;
});
