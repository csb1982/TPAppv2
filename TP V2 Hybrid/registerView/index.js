'use strict';

app.registerView = kendo.observable({
    onShow: function() {}
});
(function (parent) {
    //Backend api key
    var apiKey = "SjYFsW3FKM9zpUQ2";
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
            
            if (!username) {
                navigator.notification.alert("Username is required.");
                return;
            }
            if (!password) {
                navigator.notification.alert("Password is required.");
                return;
            }
            el.Users.register(username, password, {
                    Email: this.email
                },
                function () {
                    navigator.notification.alert("Your account was successfully created.");
                app.mobileApp.navigate("home/view.html");
               /*
                //Log user in
                el.Users.login(username, password,
                function (data) {
                    dataSource.read();
                    app.mobileApp.navigate("settingsView/view.html");
                },
                function () {
                    navigator.notification.alert("Unfortunately we could not find your account.");
                });
                	*/
                },
                function () {
                    navigator.notification.alert("Unfortunately we were unable to create your account.");
                });
        }     
    });

    parent.set('registerViewModel', registerViewModel);
})(app.registerView);