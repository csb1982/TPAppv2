'use strict';

app.registerView = kendo.observable({
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

    var registerViewModel = kendo.observable({
        fields: {
            password: '',
            username: '',
            url: '',
        },
        //****************** On save button click ******************
        submit: function () {
            // Set Setting values with whats inputted
            var username = registerViewModel.fields.username;
            var password = registerViewModel.fields.password;
            var url = registerViewModel.fields.url;
            
            if (!this.username) {
                navigator.notification.alert("Username is required.");
                return;
            }
            if (!this.password) {
                navigator.notification.alert("Password is required.");
                return;
            }
            el.Users.register(this.username, this.password, {
                    Email: this.email
                },
                function () {
                    navigator.notification.alert("Your account was successfully created.");
                    //window.location.href = "#login";
                	app.mobileApp.navigate("home/view.html");
                },
                function () {
                    navigator.notification.alert("Unfortunately we were unable to create your account.");
                });
        }     
    });

    parent.set('registerViewModel', registerViewModel);
})(app.registerView);