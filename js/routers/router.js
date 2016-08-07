/**
 * Created by bubble on 26.07.16.
 */

define([
    'jquery',
    'backbone',
    'collections/items',
    'common',
    'models/item',
    'views/listItems',
    'views/newItem',
    'views/fullItem',
    'text!../../templates/HeaderView.html'
], function ($, Backbone, ItemList, Common, Item, ListItemsView, NewItemView, FullItemView, headerTemplate) {
    var LibraryRouters = Backbone.Router.extend({
        $mainBlock: $('#library-app'),
        routes: {
            "": "home",
            "create": "createItem",
            // "about": "showAbout",
            "item/:id": "getItem",
            "search/(:query)": "searchItem",
            "*filter": "setFilter"
        },
        initialize: function () {
            $('.header').html(headerTemplate);
            this.home();
        },
        home: function(){
            var listItemView = new ListItemsView();
            this.renderPage(listItemView);
        },
        showAbout: function () {
            console.log('about');
        },
        getItem: function (id) {
            var self = this;
            var item = new Item({objectId: id});
            item.fetch({
                success: function (data) {
                    // Note that we could also 'recycle' the same instance of EmployeeFullView
                    // instead of creating new instances
                    self.renderPage(new FullItemView({model: data}));
                }
            });
            console.log(id);
        },
        searchItem: function (query) {
            var query = (query || '').trim();
            Common.searchQuery = query;
            ItemList.trigger('search');
        },
        setFilter: function (param) {
            var param = (param || '').trim();
            Common.libraryFilter = param;
            ItemList.trigger('filter');
        },
        createItem: function () {
            var newItemView = new NewItemView();
            this.renderPage(newItemView);
        },
        renderPage: function(view){
            view.render();
            this.$mainBlock.html(view.el);
        }
    });
    return LibraryRouters;
});
