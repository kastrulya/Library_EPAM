/**
 * Created by bubble on 25.07.16.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/items',
    'collections/searchable',
    'views/item',
    'common',
    'persistence/backendless'
], function ($, _, Backbone, ItemList, Searchable, ItemView, Common, Backendless) {
   var AppView =  Backbone.View.extend({
       el: '#library-app',
       initialize: function(){
           this.$input = this.$('#new-item');
           this.$newTitle = this.$('#new-item #title');
           this.$newAuthor = this.$('#new-item #author');
           this.$newDescr = this.$('#new-item #description');
           this.$newPath = this.$('#new-item #new-file');
           this.$list = this.$('#all-item');
           this.$search = this.$('#search_library-app');
           this.listenTo(ItemList, 'add', this.addOne);
           this.listenTo(ItemList, 'reset', this.addAll);

           this.listenTo(ItemList, 'filter', this.filterAll);
           
           ItemList.fetch();
       },
       events: {
           'keypress #new-item': 'createOnEnter',
           'click #search-bttn': 'searchItem',
           'keypress #search-field': 'searchOnEnter'
       },

       searchOnEnter: function(event){
           if ( event.which !== Common.ENTER_KEY) {
               return;
           }
           this.searchItem();
       },
       searchItem: function () {
           var query = this.$search.find('input').val().trim();
           var searchItemys = Searchable.extend({
               url: ItemList.url
           });
           searchItems.search(query);
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
       },
       newAttributes: function() {
           return {
               title: this.$newTitle.val().trim(),
               author: this.$newAuthor.val().trim(),
               description: this.$newDescr.val().trim(),
               filePath: this.$newPath.val(),
               liked: false
           };
       },
       clearForm: function(form){
           form.find('input[type=\'text\']').each(function(i, item){
               $(item).val('');
           });
       },
       createOnEnter: function (event) {
           if ( event.which !== Common.ENTER_KEY) {
               return;
           }
           ItemList.create(this.newAttributes());
           this.clearForm(this.$input);
       }
   });
    return AppView;
});
