define([
    'jquery',
    'underscore',
    'backbone',
    'leaflet',
    'text!../../templates/ContactsView.html'
], function ($, _, Backbone, L, template) {
    var ContactsView = Backbone.View.extend({
        template: template,
        initialize: function () {
            $(this.el).html(this.template);
            console.log('Contacts view');
        },
        render: function () {
            // $(this.el).html(this.template);
            // var mymap = L.map('mapid').setView([51.505, -0.09], 13);
            var mymap = L.map('mapid', {
                center: new L.LatLng(50.4501, 30.5234),
                zoom: 14,
                maxZoom: 18,
                minZoom: 6
            });
            L.tileLayer(
                'https://api.mapbox.com/styles/v1/kastrulya/ciopmkl6g0052i8nmlnjw6iww/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FzdHJ1bHlhIiwiYSI6ImNpb3Bsdm92dTAwMDJ2bG0xenEwZmJlYm4ifQ.nsPNZQ726nMQtszDGhDX3w',
                {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    accessToken: 'pk.eyJ1Ijoia2FzdHJ1bHlhIiwiYSI6ImNpb3Bsdm92dTAwMDJ2bG0xenEwZmJlYm4ifQ.nsPNZQ726nMQtszDGhDX3w'
                }).addTo(mymap);
            var marker = L.marker([50.4501, 30.5234]).addTo(mymap);
            return this;
        }
    });
    return ContactsView;
});
