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

    var cViewModel = kendo.observable({
        fields: {
            password: '',
            username: '',
            url: 'https://eclipsetouchpoint.co.uk/',
        },
        //****************** On save button click ******************
        submit: function () {
            var saved = 0;
function alertDismissed() {
    
}
            // Set Setting values from user input
            //var username = cViewModel.fields.username;
            //var password = cViewModel.fields.password;
            var url = cViewModel.fields.url;

            // Check settings for been inputted
            /*
            if (!username) {
                navigator.notification.alert("Username is required.",""," ");
                return;
            }
            if (!password) {
                navigator.notification.alert("Password is required.",""," ");
                return;
            }
            */
            if (!url) {
                navigator.notification.alert("Url is required.",alertDismissed," ");
                return;
            }

            //Fetch data from Backend
            dataSource.fetch(function () {
                alert("fetch");
                var datasourcedata = dataSource.data();
                var c = 0;

                // iterate through all data
                for (var i = 0; i < datasourcedata.length; i++) {
                    c++;
                }

                //If data exists, update data
                if (c > 0) {
                    /*
                    var item1 = dataSource.data()[0];
                    item1.set('username', username);

                    var item2 = dataSource.data()[0];
                    item2.set('password', password);
					*/
                    var item3 = dataSource.data()[0];
                    item3.set('url', url);
                    
                    var page = url.substring(url.lastIndexOf('/') + 1);

                    //Sync data source
                    dataSource.one("sync", this.close);
                    dataSource.sync();
                    navigator.notification.alert("Settings have been saved",alertDismissed," ");
                    saved = 1;
                    
                    // Set local storage with database data
                    //localStorage.setItem("username", username);
                    //localStorage.setItem("password", password);
                    localStorage.setItem("url", url);
                    localStorage.setItem("page", page);
                    
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
                    navigator.notification.alert("Settings have been updated",alertDismissed," ");
                    saved = 1;
                    
                    // Set local storage with new data
                    //localStorage.setItem("username", username);
                    //localStorage.setItem("password", password);
                    localStorage.setItem("url", url);
                    localStorage.setItem("page", page);
                    
                    app.mobileApp.navigate("tpView/view.html");
                }

            });
            // If haven't saved data, send back to login screen.
            var interval = setTimeout(function () {
                if (saved == 0) {
                    navigator.notification.alert("Unfortunately we could not find your account.",alertDismissed," ");
                    app.mobileApp.navigate("home/view.html");
                }
            }, 10000);

        },
        //****************** On cancel button click ******************        
        cancel: function () {
            //Reset user values
            //$('#settingUsername').val("").change();
            //$('#settingPassword').val("").change();
            $('#settingUrl').val("").change();

        },
        //****************** On reset button click ******************        
        reset: function () {
            //Reset user values
            navigator.notification.alert("All settings cleared",""," ");
            //$('#settingUsername').val("").change();
            //$('#settingPassword').val("").change();
            $('#settingUrl').val("").change();
            localStorage.clear();

        },
    });

    parent.set('cViewModel', cViewModel);
})(app.settingsView);