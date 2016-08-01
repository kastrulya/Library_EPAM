/**
 * Created by bubble on 25.07.16.
 */
var app = app || {};

app.AppView = Backbone.View.extend({
    el: '#library-app',
    initialize: function(){
        this.$input = this.$('#new-item');
        this.$newTitle = this.$('#new-item #title');
        this.$newAuthor = this.$('#new-item #author');
        this.$newDescr = this.$('#new-item #description');
        this.$list = this.$('#all-item');
        this.listenTo(app.ItemList, 'add', this.addOne);
        this.listenTo(app.ItemList, 'reset', this.addAll);

        this.listenTo(app.ItemList, 'filter', this.filterAll);

        app.ItemList.fetch({reset: true});

        // app.ItemList.fetch({reset: true});
    },
    events: {
        'keypress #new-item': 'createOnEnter'
    },
    filterAll: function () {
        app.ItemList.each(this.filterOne, this);
    },
    filterOne: function (item) {
        item.trigger('visible');
    },
    addOne: function(item){
        var view = new app.ItemView({model: item});
        this.$list.append(view.render().el);
    },
    addAll: function(){
        this.$list.html('');
        app.ItemList.each(this.addOne, this);
    },
    newAttributes: function() {
        return {
            title: this.$newTitle.val().trim(),
            author: this.$newAuthor.val().trim(),
            description: this.$newDescr.val().trim(),
            liked: false
        };
    },
    clearForm: function(form){
        form.find('input[type=\'text\']').each(function(i, item){
            $(item).val('');
        });
    },
    createOnEnter: function (event) {
        if ( event.which !== ENTER_KEY) {
            return;
        }
        app.ItemList.create(this.newAttributes());
        this.clearForm(this.$input);
    }

});