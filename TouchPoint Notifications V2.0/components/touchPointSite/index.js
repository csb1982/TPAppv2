'use strict';

app.touchPointSite = kendo.observable({
    onShow: function() {
       
        console.log('onShow fired');
        
        var url = 'https://eclipsetouchpoint.co.uk/Eclipse';	
        
        $('#iframeContainer').attr('src', url);
        
    },
    afterShow: function() {
        console.log('afterShow fired');
    }
});

