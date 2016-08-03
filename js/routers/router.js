/**
 * Created by bubble on 26.07.16.
 */

define([
    'jquery',
    'backbone',
    'collections/items',
    'common'
], function ($, Backbone, ItemList, Common) {
    var LibraryRouters = Backbone.Router.extend({
        routes: {
            "about": "showAbout",
            "item/:id": "getItem",
            "search/:query": "searchItem",
            "*filter": "setFilter"
        },
        showAbout: function () {
            console.log('about');
        },
        getItem: function (id) {
            console.log(id);
        },
        searchItem: function (query) {
            console.log(query);
        },
        setFilter: function (param) {
            console.log('filter');
            var param = (param || '').trim();
            Common.libraryFilter = param;
            ItemList.trigger('filter');
        }
    });
    return LibraryRouters;
});
