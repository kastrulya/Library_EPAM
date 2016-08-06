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
        el: '#list-item',
        template: itemListTemplate,
        initialize: function(){
            this.$list = this.$('#all-item');
            this.$search = this.$('.search_library-app');
            this.listenTo(ItemList, 'add', this.addOne);
            this.listenTo(ItemList, 'reset', this.addAll);
            this.listenTo(ItemList, 'filter', this.filterAll);

            ItemList.fetch();
        },
        events: {
            'click #search-bttn': 'searchItem',
            'keypress #search-field': 'searchOnEnter'
        },
        render: function(){
            $(this.el).html(this.template());
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
            ItemList.search(query)
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