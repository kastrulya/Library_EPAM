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
    'views/contacts',
    'text!../../templates/HeaderView.html'
], function ($, Backbone, ItemList, Common, Item, ListItemsView, NewItemView, FullItemView, ContactsView, headerTemplate) {
    var LibraryRouters = Backbone.Router.extend({
        $mainBlock: $('#library-app'),
        routes: {
            "": "home",
            "#": "home",
            "create": "createItem",
            "contacts": "showContacts",
            "item/:id": "getItem",
            "search/(:query)": "searchItem",
            "*filter": "setFilter",
            default: "home"
        },
        initialize: function () {
            $('.header').html(headerTemplate);
        },
        home: function () {
            if (!this.listItemView) {
                this.listItemView = new ListItemsView();
                this.listItemView.render();
            } else {
                this.listItemView.delegateEvents(); // delegate events when the view is recycled
                this.listItemView.collectionItemView.forEach(item => item.delegateEvents());
            }
            this.$mainBlock.html(this.listItemView.el);
        },
        showContacts: function () {
            if (!this.contactsView) {
                this.contactsView = new ContactsView();
            }
            this.$mainBlock.html(this.contactsView.el);
            this.contactsView.render();

            // var contactsView = new ContactsView();
            // this.$mainBlock.html(contactsView.el);
            // contactsView.render();
            // this.renderPage(contactsView);
        },
        getItem: function (id) {
            var self = this;
            var item = new Item({objectId: id});
            item.fetch({
                success: function (data) {
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
            // if (!this.newItemView) {
            //     this.newItemView = new NewItemView();
            //     this.newItemView.render();
            // } else {
            //     this.newItemView.delegateEvents(); // delegate events when the view is recycled
            // }
            // this.$mainBlock.html(this.newItemView.el);

            var newItemView = new NewItemView();
            this.renderPage(newItemView);
        },
        renderPage: function (view) {
            view.render();
            this.$mainBlock.html(view.el);
        }
    });
    return LibraryRouters;
});
