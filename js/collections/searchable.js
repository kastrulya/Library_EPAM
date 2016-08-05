/**
 * Created by bubble on 05.08.16.
 */

define([
    'jquery',
    'undescore'
], function ($, _) {
   var Searchable = Backbone.Collection.extend({},{
        search: function(query, options){
            options = options || {};
            var search = $.Deferred();
            var collection = new this([], options);
            collection.url = _.result(collection, 'url') + 'search';
            var fetch = collection.fetch({
                data: {
                    q: query
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