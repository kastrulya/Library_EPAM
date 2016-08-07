/**
 * Created by bubble on 07.08.16.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/items',
    'views/item',
    'common',
    'text!../../templates/ItemListView.html'
], function ($, _, Backbone, ItemList, ItemView, Common, itemListTemplate) {
    var ListItemsView = Backbone.View.extend({
        template: itemListTemplate,
        initialize: function(){
            this.listenTo(ItemList, 'add', this.addOne);
            this.listenTo(ItemList, 'reset', this.addAll);
            this.listenTo(ItemList, 'filter', this.filterAll);
            this.listenTo(ItemList, 'search', this.filterSearch.bind(this, Common.searchQuery));

            ItemList.fetch();
        },
        events: {
            'click #search-bttn': 'searchItem',
            'keypress #search-field': 'searchOnEnter'
        },
        render: function(){
            $(this.el).html(this.template);
            this.$list = this.$('#all-item');
            this.$search = this.$('.search_library-app');
            return this;
        },
        searchOnEnter: function(event){
            if ( event.which !== Common.ENTER_KEY) {
                return;
            }
            this.searchItem();
        },
        searchItem: function () {
            var query = this.$search.find('input').val().trim();
            Backbone.history.navigate('search/' + query, true);
            // filterSearch(query);
        },
        filterSearch: function() {
            ItemList.search(Common.searchQuery)
                .done(_.bind(function(){
                    ItemList.trigger('reset');
                }));
        },
        filterAll: function () {
            ItemList.each(this.filterOne, this);
        },
        filterOne: function (item) {
            item.trigger('visible');
        },
        addOne: function(item){
            var view = new ItemView({model: item});
            this.$list.append(view.render().el);
        },
        addAll: function(){
            this.$list.html('');
            ItemList.each(this.addOne, this);
        }
    });
    return ListItemsView;
});