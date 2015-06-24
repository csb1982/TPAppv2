'use strict';

app.home = kendo.observable({
    onShow: function () {
        $("#appDrawer").data("kendoMobileDrawer").hide();
    }
});

(function (parent) {
    //Backend API key
    var apiKey = "vv4BtGwI2jSFFWd6"; // Telerik API key
    var el = new Everlive(apiKey);

    var dataSource = new kendo.data.DataSource({
        type: "everlive",
        transport: {
            typeName: "userSettings"
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
                            // Call the instance of kendo.mobile.Application that was created in app.js bootstrap

							// Set values from backend service
                            var username = datasourcedata[0].username;
                            var password = datasourcedata[0].password;
                            var url = datasourcedata[0].url;
                            var page = url.substring(url.lastIndexOf('/') + 1);
                            
                            alert("Values " + username + password + url + page);
                            app.mobileApp.navigate("tpView/view.html");
/*

                            $.ajax({
                                    url: url,
                                    type: "POST",
                                    data: {
                                        userName: username,
                                        password: password,
                                        siteID: page
                                    }
                                })
                                .done(function (data) {
                                    //use data from server
                                    //alert("Done ");
                                })
                                .fail(function () {
                                    //alert("Error ");
                                });
*/


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
        register: function () {
            app.mobileApp.navigate("registerView/view.html");
        },
        
        reset: function () {
            app.mobileApp.navigate("resetView/view.html");
        }
    });   

    parent.set('settingsViewModel', settingsViewModel);
})(app.home);