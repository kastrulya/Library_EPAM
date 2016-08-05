/**
 * Created by bubble on 03.08.16.
 */



define([
    'jquery'
],
    function($){
        var APPLICATION_ID = '17EB0884-9EA5-BAB0-FFDB-64FAD6B4E300';
        var SECRET_KEY = 'E4DDF2E2-578E-1C1E-FF1A-0F248EC06C00';
        var APPLICATION_TYPE = "REST";
        var Backendless = {
            setHeader : function (xhr) {
                xhr.setRequestHeader('application-id', APPLICATION_ID);
                xhr.setRequestHeader('secret-key', SECRET_KEY);
                xhr.setRequestHeader('application-type', APPLICATION_TYPE);
            },
            config: function(){
                var self = this;
                $.ajaxSetup( {beforeSend: function(xhr) {
                    self.setHeader(xhr);
                } } );
            }            
    };
        return Backendless;
});