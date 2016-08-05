/**
 * Created by bubble on 05.08.16.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/item'
], function ($, _, Backbone) {
    var createSearchQuery = function (searchWord) {
        var fields = ['author', 'description', 'title'];
        var query = [];
        fields.forEach(field => {
            query.push(field + " like '%" + searchWord + "%'");
        });
        query = query.join(' or ');
        return query;
    };
    var Searchable = Backbone.Collection.extend({},{
        search: function(query, options){
            options = options || {};
            var search = $.Deferred();
            var collection = new this([], options);
            // collection.url = _.result(collection, 'url') + 'where';
            // collection.url = collection.url;
            var fetch = collection.fetch({
                data: {
                    where: createSearchQuery(query)
                }
            });
            fetch.done(_.bind(function(){
                Backbone.Events.trigger('search:done');
                search.resolveWith(this, [collection]);
            }, this));
            fetch.fail(function(){
                Backbone.Events.trigger('search:fail');
                search.reject();
            });
            return search.promise();
        }
    });
    return Searchable;
});