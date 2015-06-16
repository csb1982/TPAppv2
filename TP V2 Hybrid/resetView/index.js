'use strict';

app.resetView = kendo.observable({
    onShow: function() {}
});
(function (parent) {
    //Backend api key
    var apiKey = "vv4BtGwI2jSFFWd6";
    var el = new Everlive(apiKey);

    //Select data source to transport
    var dataSource = new kendo.data.DataSource({
        type: "everlive",
        transport: {
            typeName: "userSettings"
        }
    });

    var resetViewModel = kendo.observable({
        fields: {
            password: '',
            username: '',
            url: '',
        },
        //****************** On save button click ******************
        submit: function () {
            if (!this.email) {
                navigator.notification.alert("Email address is required.");
                return;
            }
            $.ajax({
                type: "POST",
                url: "https://api.everlive.com/v1/" + apiKey + "/Users/resetpassword",
                contentType: "application/json",
                data: JSON.stringify({
                    Email: this.email
                }),
                success: function () {
                    navigator.notification.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                    //window.location.href = "#login";
                    app.mobileApp.navigate("home/view.html");
                },
                error: function () {
                    navigator.notification.alert("Unfortunately, an error occurred resetting your password.")
                }
            });
        }    
    });

    parent.set('resetViewModel', resetViewModel);
})(app.resetView);