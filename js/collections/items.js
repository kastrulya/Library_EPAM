/**
 * Created by bubble on 25.07.16.
 */
// var app = app || {};

define([
    'underscore',
    'backbone',
    'models/item'
], function (_, Backbone, Item) {
        var createSearchQuery = function (searchWord) {
            var fields = ['author', 'description', 'title'];
            var query = [];
            fields.forEach(field => {
                query.push(field + " like '%" + searchWord + "%'");
            });
            query = query.join(' or ');
            return query;
        };
        var ItemList = Backbone.Collection.extend({
            model: Item,
            url: 'http://api.backendless.com/v1/data/items',
            // localStorage: new Store('library-backbone'),
            parse: function (response) {
                return response.data;
            },
            liked: function(){
                return this.filter(function(item){
                    return item.liked;
                });
            },
            search: function(query){
                var searching = this.fetch({
                    data: {
                        where: createSearchQuery(query)
                    }
                });
                return searching;
            }
        });
        return new ItemList();
});
