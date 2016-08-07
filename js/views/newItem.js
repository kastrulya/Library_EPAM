/**
 * Created by bubble on 07.08.16.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'common',
    'collections/items',
    'text!../../templates/NewItemView.html'
], function($, _, Backbone, Common, ItemList, newItemTemplate){
    var NewItemView = Backbone.View.extend({
        template: newItemTemplate,
        // initialize: function(){
        //     ItemList.fetch();
        // },
        render: function(){
            $(this.el).html(this.template);
            this.$input = this.$('#new-item');
            this.$newTitle = this.$('#new-item #title');
            this.$newAuthor = this.$('#new-item #author');
            this.$newDescr = this.$('#new-item #description');
            this.$newPath = this.$('#new-item #new-file');
            return this;
        },
        events: {
            'keypress #new-item': 'createOnEnter'
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
    return NewItemView;
});