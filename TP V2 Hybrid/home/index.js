'use strict';

app.home = kendo.observable({
    onShow: function (e) {
        $("#appDrawer").data("kendoMobileDrawer").hide();
        
       
        // Check its first time for the user if so change login view to a register view.
        //if (localStorage.getItem("firstTime") != undefined && localStorage.getItem("firstTime") == "1") {
        if (localStorage.getItem("firstTime") != undefined && localStorage.getItem("firstTime") == "1") {
            $("#email").show();
            $("#url").show();
            $("#loginBT").val("Register");
            $("#Bottom_Login_Buttons2").hide();
            //localStorage.setItem("firstTime", "");
            // Clear values from screen
            $("#loginUsername").val("");
            $("#loginPassword").val("");
            $("#loginEmail").val("");
        } else {
            $("#email").hide();
            $("#url").hide();
            $("#Bottom_Login_Buttons2").show();
            $("#loginBT").val("Login");
            // Clear values from screen
            $("#loginUsername").val("");
            $("#loginPassword").val("");
            //$("#login").data("kendoMobileNavBar").title("MyCustomTitle");           

        }

    }
});

(function (parent) {
    //Backend API key
    var apiKey = "SjYFsW3FKM9zpUQ2"; // Telerik API key
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
            email: '',
            url: 'https://eclipsetouchpoint.co.uk/',
        },

        //**********************
        submit: function () {
            // Set Setting values with whats inputted
            var username = settingsViewModel.fields.username;
            var password = settingsViewModel.fields.password;
            var email = settingsViewModel.fields.email;
            var url = settingsViewModel.fields.url;
            
            function alertDismissed() {
        // do something
    }
            
            if (!username) {
                navigator.notification.alert("Username is required.",alertDismissed," ");
                return;
            }
            if (!password) {
                navigator.notification.alert("Password is required.", alertDismissed, " ");
                return;
            }
            if (localStorage.getItem("firstTime") != undefined && localStorage.getItem("firstTime") == "1") {

            }
            /*
            if (!email) {
                navigator.notification.alert("Email address is required.","","");
                return;
            }
            if (!url) {
                navigator.notification.alert("TouchPoint URL is required.","","");
                return;
            }
            */
            // If first time get user to register
            if (localStorage.getItem("firstTime") != undefined && localStorage.getItem("firstTime") == "1") {
                if (!url) {
                    navigator.notification.alert("TouchPoint URL is required.", alertDismissed, " ");
                    return;
                }
                if (url.indexOf("https://eclipsetouchpoint.co.uk/") >= 0) {
                                    el.Users.register(username, password, {
                        Email: email
                    },
                                                    
                    function () {
                        navigator.notification.alert("Your account was successfully created.", alertDismissed, " ");
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
                                        var username1 = datasourcedata[0].username;
                                        var password1 = datasourcedata[0].password;
                                        var url1 = datasourcedata[0].url;
                                        var page1 = url.substring(url.lastIndexOf('/') + 1);
										// Send to TP View
                                        app.mobileApp.navigate("tpView/view.html");

                                    } else {
                                        // Add user settings to database
                                        dataSource.add({
                                            username: username,
                                            password: password,
                                            url: url
                                        });
                                        dataSource.one("sync", this.close);
                                        dataSource.sync();
                                        if (localStorage.getItem("firstTime") != undefined && localStorage.getItem("firstTime") == "1") {

                                            localStorage.setItem("firstTime", "");
                                        }
                                        //navigator.notification.alert("TouchPoint Settings have been created", "", " ");
                                        app.mobileApp.navigate("tpView/view.html");
                                    }

                                });
                                dataSource.read();
                            },
                            function () {
                            	navigator.notification.alert("Unfortunately those login details were incorrect. Be sure you're using the login details for your TouchPoint account.", alertDismissed, " ");
                            });
                    },
                    function () {
                        navigator.notification.alert("Unfortunately we were unable to create your account with those details.", alertDismissed, " ");
                    });

                } else {
                    navigator.notification.alert("Url does not match site address", alertDismissed, " ");
                    return;
                }

            //end register
            } else {
                
                //Else Login
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
                                //var username1 = datasourcedata[0].username;
                                //var password1 = datasourcedata[0].password;
                                var url1 = datasourcedata[0].url;
                                var page1 = url1.substring(url1.lastIndexOf('/') + 1);

                                app.mobileApp.navigate("tpView/view.html");

                            } else {
                                // Add user settings to database
                                dataSource.add({
                                    username: username,
                                    password: password,
                                    url: url
                                });
                                dataSource.one("sync", this.close);
                                dataSource.sync();
                                if (localStorage.getItem("firstTime") != undefined && localStorage.getItem("firstTime") == "1") {

                                    localStorage.setItem("firstTime", "");
                                }
                                navigator.notification.alert("TouchPoint Settings have been created", alertDismissed, " ");
                                app.mobileApp.navigate("tpView/view.html");
                            }
                        });
                        dataSource.read();

                    },
                    function () {
                        navigator.notification.alert("Unfortunately those login details were incorrect. Be sure you're using the login details for your TouchPoint account.", alertDismissed, " ");
                    });
                
            }// Else Login End


            /*
            el.Users.register(username, password, {
                    Email: email
                },
                function () {
                    navigator.notification.alert("Your account was successfully created.", "", "");
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
                                    var username1 = datasourcedata[0].username;
                                    var password1 = datasourcedata[0].password;
                                    var url1 = datasourcedata[0].url;
                                    var page1 = url.substring(url.lastIndexOf('/') + 1);
                                    app.mobileApp.navigate("tpView/view.html");
                                } else {
                                    // Add user settings to database
                                    dataSource.add({
                                        username: username,
                                        password: password,
                                        url: url
                                    });
                                    dataSource.one("sync", this.close);
                                    dataSource.sync();
                                    navigator.notification.alert("TouchPoint Settings have been created", "", "");
                                    app.mobileApp.navigate("tpView/view.html");
                                    if (localStorage.getItem("firstTime") != undefined && localStorage.getItem("firstTime") == "1") {
                                        localStorage.setItem("firstTime", "");
                                    }
                                }
                            });
                            dataSource.read();
                        },
                        function () {
                            navigator.notification.alert("Unfortunately we could not find your account.", "", "");
                        });
                },
                function () {
                    navigator.notification.alert("Unfortunately we were unable to create your account.", "", "");
                });
            */
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

