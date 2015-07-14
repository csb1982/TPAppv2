'use strict';

app.settingsView = kendo.observable({
    onShow: function () {}
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

    var settingsViewModel = kendo.observable({
        fields: {
            password: '',
            username: '',
            url: '',
        },
        //****************** On save button click ******************
        submit: function () {
            var saved = 0;


            // Set Setting values from user input
            var username = settingsViewModel.fields.username;
            var password = settingsViewModel.fields.password;
            var url = settingsViewModel.fields.url;

            // Check settings for been inputted 
            if (!username) {
                navigator.notification.alert("Username is required.","","");
                return;
            }
            if (!password) {
                navigator.notification.alert("Password is required.","","");
                return;
            }
            if (!url) {
                navigator.notification.alert("Url is required.","","");
                return;
            }

            //Fetch data from Backend
            dataSource.fetch(function () {
                var datasourcedata = dataSource.data();
                var c = 0;


                // iterate through all data
                for (var i = 0; i < datasourcedata.length; i++) {
                    c++;
                }

                //If data exists, update data
                if (c > 0) {
                    var item1 = dataSource.data()[0];
                    item1.set('username', username);

                    var item2 = dataSource.data()[0];
                    item2.set('password', password);

                    var item3 = dataSource.data()[0];
                    item3.set('url', url);

                    //Sync data source
                    dataSource.one("sync", this.close);
                    dataSource.sync();
                    navigator.notification.alert("Settings have been saved","","");
                    saved = 1;
                    app.mobileApp.navigate("tpView/view.html");
                }
                //Else add new data
                else {
                    dataSource.add({
                        username: username,
                        password: password,
                        url: url
                    });
                    dataSource.one("sync", this.close);
                    dataSource.sync();
                    navigator.notification.alert("Settings have been updated","","");
                    saved = 1;
                    app.mobileApp.navigate("tpView/view.html");
                }

            });


            // If haven't saved data, send back to login screen.
            var interval = setTimeout(function () {
                if (saved == 0) {
                    navigator.notification.alert("Unfortunately we could not find your account.","","");
                    app.mobileApp.navigate("home/view.html");
                }
            }, 5000);

        },
        //****************** On cancel button click ******************        
        cancel: function () {
            //Reset user values
            $('#username').val("").change();
            $('#password').val("").change();
            $('#url').val("").change();

        },
        //****************** On reset button click ******************        
        reset: function () {
            //Reset user values
            navigator.notification.alert("All settings cleared","","");
            $('#username').val("").change();
            $('#password').val("").change();
            $('#url').val("").change();
            localStorage.clear();

        },
    });

    parent.set('settingsViewModel', settingsViewModel);
})(app.settingsView);