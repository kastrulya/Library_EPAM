/**
 * Created by bubble on 26.07.16.
 */

define([
    'jquery',
    'backbone',
    'collections/items',
    'common',
    'views/listItems',
    'text!../../templates/HeaderView.html'
], function ($, Backbone, ItemList, Common, ListItemsView, headerTemplate) {
    var LibraryRouters = Backbone.Router.extend({
        $mainBlock: $('#library-app'),
        routes: {
            "": "home",
            // "about": "showAbout",
            // "item/:id": "getItem",
            "search/(:query)": "searchItem",
            "*filter": "setFilter",
            "create": "createItem"
        },
        initialize: function () {
            $('.header').html(headerTemplate);
            this.home();
        },
        home: function(){
            var listItemView = new ListItemsView();
            listItemView.render();
            this.$mainBlock.html(listItemView.el);
        },
        showAbout: function () {
            console.log('about');
        },
        getItem: function (id) {
            console.log(id);
        },
        searchItem: function (query) {
            var query = (query || '').trim();
            Common.searchQuery = query;
            ItemList.trigger('search');
            console.log(query);
        },
        setFilter: function (param) {
            var param = (param || '').trim();
            Common.libraryFilter = param;
            ItemList.trigger('filter');
        },
        createItem: function () {

        }
    });
    return LibraryRouters;
});
