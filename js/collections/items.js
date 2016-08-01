/**
 * Created by bubble on 25.07.16.
 */
var app = app || {};

var ItemList = Backbone.Collection.extend({
   model: app.Item,
    localStorage: new Backbone.LocalStorage('library-backbone'),
    // localStorage: localStorage,
    liked: function(){
        return this.filter(function(item){
            return item.liked;
        });
    }
});

app.ItemList = new ItemList();