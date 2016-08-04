/**
 * Created by bubble on 25.07.16.
 */
// var app = app || {};

define([
    'underscore',
    'backbone',
    'backboneLocalstorage',
    'models/item'
], function (_, Backbone, Store, Item) {
        var ItemList = Backbone.Collection.extend({
            model: Item,
            url: 'http://api.backendless.com/v1/data/items',
            // localStorage: new Store('library-backbone'),
            liked: function(){
                return this.filter(function(item){
                    return item.liked;
                });
            }
        });
        return new ItemList();
});
