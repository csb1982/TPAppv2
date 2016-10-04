'use strict';

app.home = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
(function (parent) {
    var homeModel = kendo.observable({
        fields: {
            rememberMe: '',
            emailAddress: '',
            password: '',
            username: '',
        },
        submit: function () {
            // Submit form
            $("#tpForm").submit();
        },
        cancel: function () { }
    });
    parent.set('homeModel', homeModel);
})(app.home);
