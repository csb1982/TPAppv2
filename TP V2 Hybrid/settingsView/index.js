'use strict';

app.settingsView = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var settingsViewModel = kendo.observable({
        fields: {
            password: '',
            username: '',
            url: '',
        },
        submit: function() {},
        cancel: function() {}
    });

    parent.set('settingsViewModel', settingsViewModel);
})(app.settingsView);