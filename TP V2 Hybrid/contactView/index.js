'use strict';

app.contactView = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var contactViewModel = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        }
    });

    parent.set('contactViewModel', contactViewModel);
})(app.contactView);

app.upl=function () {
        var sLink = "mailto:test@test.com?subject=test";
        window.location.href=sLink;
    };