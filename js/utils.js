/**
 * Created by bubble on 06.08.16.
 */
define([
    'jquery',
    'underscore',
    'views/app',
    'views/item'
], function($, _, AppView, ItemView){
    var views = [AppView, ItemView];
    var templateLoader = {
        load: function(templates, callback) {

            var deferreds = [];

            $.each(views, function(index, view) {
                if (view) {
                    deferreds.push($.get('templates/' + templates[index] + '.html', function(data) {
                        view.prototype.template = _.template(data);
                    }, 'html'));
                } else {
                    alert(view + " not found");
                }
            });

            $.when.apply(null, deferreds).done(callback);
        }
    };
    return templateLoader;
});