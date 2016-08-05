/**
 * Created by bubble on 25.07.16.
 */
// var app = app || {};

define([
    'underscore',
    'backbone',
    'models/item'
], function (_, Backbone, Item) {
        var ItemList = Backbone.Collection.extend({
            model: Item,
            url: 'http://api.backendless.com/v1/data/items',
            // localStorage: new Store('library-backbone'),
            parse: function (responce) {
                return responce.data;
            },
            liked: function(){
                return this.filter(function(item){
                    return item.liked;
                });
            }
        });
        return new ItemList();
});
