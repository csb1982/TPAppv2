'use strict';

app.settingsView = kendo.observable({
    onShow: function () {}
});
(function (parent) {

    //Backend api key
    var apiKey = "fVu2MUaaCYHk9fL7";
    var el = new Everlive(apiKey);

    //Select data source to transport
    var groceryDataSource = new kendo.data.DataSource({
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

            // Set Setting values from user input
            var username = settingsViewModel.fields.username;
            var password = settingsViewModel.fields.password;
            var url = settingsViewModel.fields.url;

            // Check settings for been inputted 
            if (!username) {
                navigator.notification.alert("Username is required.");
                return;
            }
            if (!password) {
                navigator.notification.alert("Password is required.");
                return;
            }
            if (!url) {
                navigator.notification.alert("Url is required.");
                return;
            }

            //Fetch data from Backend
            groceryDataSource.fetch(function () {
                var datasourcedata = groceryDataSource.data();
                var c = 0;

                // iterate through all data
                for (var i = 0; i < datasourcedata.length; i++) {
                    c++;
                }

                //If data exists, update data
                if (c > 0) {
                    var item1 = groceryDataSource.data()[0];
                    item1.set('username', username);

                    var item2 = groceryDataSource.data()[0];
                    item2.set('password', password);

                    var item3 = groceryDataSource.data()[0];
                    item3.set('url', url);

                    //Sync data source
                    groceryDataSource.one("sync", this.close);
                    groceryDataSource.sync();
                }
                //Else add new data
                else {
                    groceryDataSource.add({
                        username: username,
                        password: password,
                        url: url
                    });
                    groceryDataSource.one("sync", this.close);
                    groceryDataSource.sync();
                }
            });
        },
        //****************** On test button click ******************        
        test: function () {
            alert("Pressed!!");
            


        },
        //****************** On cancel button click ******************        
        cancel: function () {
            //Reset user values
            $('#username').val("").change();
            $('#password').val("").change();
            $('#url').val("").change();
        },
    });

    parent.set('settingsViewModel', settingsViewModel);
})(app.settingsView);