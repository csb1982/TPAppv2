'use strict';

app.home = kendo.observable({
    onShow: function () {
        $("#appDrawer").data("kendoMobileDrawer").hide();
    }
});

(function (parent) {
    //Backend API key
    var apiKey = "fVu2MUaaCYHk9fL7";
    var el = new Everlive(apiKey);

    var dataSource = new kendo.data.DataSource({
        type: "everlive",
        transport: {
            typeName: "Test"
        }
    });

    var settingsViewModel = kendo.observable({
        fields: {
            password: '',
            username: '',
            url: '',
        },

        submit: function () {
            // Set Setting values with whats inputted
            var username = settingsViewModel.fields.username;
            var password = settingsViewModel.fields.password;
            var url = settingsViewModel.fields.url;

            if (!username) {
                navigator.notification.alert("Username is required.");
                return;
            }
            if (!password) {
                navigator.notification.alert("Password is required.");
                return;
            }
            el.Users.login(username, password,
                function (data) {

                    //Select data source to transport
                    var dataSource = new kendo.data.DataSource({
                        type: "everlive",
                        transport: {
                            typeName: "userSettings"
                        }
                    });

                    //Fetch data from Backend
                    dataSource.fetch(function () {
                        var datasourcedata = dataSource.data();
                        var c = 0;

                        // iterate through all data
                        for (var i = 0; i < datasourcedata.length; i++) {
                            c++;
                        }

                        //If data send to tp view
                        if (c > 0) {
                            // Call the instance of kendo.mobile.Application that was created in app.js bootstrap.
                            app.mobileApp.navigate("tpView/view.html");


                        } else {
                            // Call the instance of kendo.mobile.Application that was created in app.js bootstrap.                 
                            app.mobileApp.navigate("settingsView/view.html");
                        }

                    });
                    dataSource.read();
                },
                function () {
                    navigator.notification.alert("Unfortunately we could not find your account.");
                });

        },
        cancel: function () {}
    });

    parent.set('settingsViewModel', settingsViewModel);
})(app.home);