'use strict';

app.home = kendo.observable({
    onShow: function () {

    }
});


(function (parent) {

    //Test
    var apiKey = "fVu2MUaaCYHk9fL7";
    var el = new Everlive(apiKey);



    var groceryDataSource = new kendo.data.DataSource({
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
                    //Working code
                    //window.location.href = "#touchPoint";



                    //Test area

                    //Select data source to transport
                    var groceryDataSource = new kendo.data.DataSource({
                        type: "everlive",
                        transport: {
                            typeName: "userSettings"
                        }
                    });

                    //Fetch data from Backend
                    groceryDataSource.fetch(function () {
                        var datasourcedata = groceryDataSource.data();
                        var c = 0;

                        // iterate through all data
                        for (var i = 0; i < datasourcedata.length; i++) {
                            c++;
                        }



                        //var result = datasourcedata[0].url;
                        //alert(result);
                        if (c > 0) {

/*
                            var con = result.indexOf("https://eclipsetouchpoint.co.uk");
                            if (result.indexOf("https://eclipsetouchpoint.co.uk") >= 0) {
                                //Check if an Eclipse address
                                var result = datasourcedata[0].url;
                            }
                            */
                            window.location.href = "#touchPoint";
                        } else {
                            // Call the instance of kendo.mobile.Application that was created in app.js bootstrap.                 
                            app.mobileApp.navigate("settingsView/view.html");
                        }

                    });


                    //Test area end


                    //var app = new window.kendo.mobile.Application();
                    //app.navigate( 'touchPointView/view.html' );


                    groceryDataSource.read();
                    navigator.notification.alert("Logged In");
                },
                function () {
                    navigator.notification.alert("Unfortunately we could not find your account.");
                });

        },
        cancel: function () {}
    });

    parent.set('settingsViewModel', settingsViewModel);
})(app.home);