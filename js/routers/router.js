/**
 * Created by bubble on 26.07.16.
 */
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
        app.libraryFilter = param;
        app.ItemList.trigger('filter');
    }
});

app.LibraryRouters = new LibraryRouters();
Backbone.history.start();