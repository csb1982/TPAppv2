'use strict';

app.tpView = kendo.observable({
    onShow: function () {
        // Set iframe visibility to hidden to stop iframe flash
        document.getElementById('tpFrame').style.visibility = "hidden";
        // Hide iframe
        document.getElementById('tpFrame').style.display = "none";
        // Hide loading image
        document.getElementById('loading').style.display = "none";
        // Hide settings button
        document.getElementById('settingBT').style.display = "none";
        document.getElementById('noSettings').style.display = "none";


        // Check for stored user data on device
        if (localStorage.getItem("username") != undefined && localStorage.getItem("password") != undefined && localStorage.getItem("url") != undefined && localStorage.getItem("page") != undefined) {
            var username = localStorage.getItem("username");
            var password = localStorage.getItem("password");
            var url = localStorage.getItem("url");
            var page = localStorage.getItem("page");
            document.getElementById("username").value = username;
            document.getElementById("password").value = password;
            document.getElementById("site").value = page;

            submitform();
            // Show iframe
            document.getElementById('tpFrame').style.display = "initial";
            // Show loading image
            document.getElementById('loading').style.display = "initial";
            // Hide settings button
            document.getElementById('settingBT').style.display = "none";

        } else {

            //document.getElementById('settingBT').style.display = "initial";
            //document.getElementById('noSettings').style.display = "initial";
            //document.getElementById('noSettings').style.color = "#ccc";
            //document.getElementById('settingBT').style.color = "#fff";
            //document.getElementById('settingBT').style.background = "#01579b";
            // Hide form
            document.getElementById('tpForm').style.display = "none";
            //Select data source to transport
            var DataSource = new kendo.data.DataSource({
                type: "everlive",
                transport: {
                    typeName: "userSettings"
                }
            });


            //Fetch data from Backend
            DataSource.fetch(function () {
                function alertDismissed() {
                    
                }
                localStorage.setItem("tp", "1");
                var datasourcedata = DataSource.data();
                var c = 0;

                // iterate through all data
                for (var i = 0; i < datasourcedata.length; i++) {
                    c++;
                }

                //Check if values are stored within background service and are of eclipse format
                if (c > 0) {
                    // document.getElementById('settingBT').style.display = "none";
                    // document.getElementById('noSettings').style.display = "none";
                    var result = datasourcedata[0].url;
                    if (result.indexOf("https://eclipsetouchpoint.co.uk/") >= 0) {
                        var username = datasourcedata[0].username;
                        var password = datasourcedata[0].password;
                        var url = datasourcedata[0].url;
                        var page = url.substring(url.lastIndexOf('/') + 1);

                        localStorage.setItem("username", username);
                        localStorage.setItem("password", password);
                        localStorage.setItem("url", url);
                        localStorage.setItem("page", page);

                        document.getElementById("username").value = username;
                        document.getElementById("password").value = password;
                        document.getElementById("site").value = page;

                        submitform();
                        submitform();
                        // Show iframe
                        document.getElementById('tpFrame').style.display = "initial";
                        // Show loading image
                        document.getElementById('loading').style.display = "initial";
                        // Hide settings button
                        document.getElementById('settingBT').style.display = "none";
                        document.getElementById('noSettings').style.display = "none";

                    } else {
                        navigator.notification.alert("Url does not match site address", alertDismissed, " ");
                        app.mobileApp.navigate("settingsView/view.html");
                    }

                } else {
                    navigator.notification.alert("No data stored. Please complete the Welcome wizard", alertDismissed, " ");
                    app.mobileApp.navigate("wizardView/view.html");
                }

            });
            DataSource.read();

        }
        // Hide settings button and description. 
        var interval = setTimeout(function () {

            if (localStorage.getItem("tp") !== "1") {
                var e = localStorage.getItem("test");
                document.getElementById('settingBT').style.display = "initial";
                document.getElementById('noSettings').style.display = "initial";
                localStorage.setItem("tp", "");
            }
        }, 1500);
    }

});


//Send back to settings page if Settings button clicked
(function (parent) {

    var tpViewModel = kendo.observable({

        //****************** On save button click ******************
        submit: function () {
            app.mobileApp.navigate("settingsView/view.html");
        }
    });

    parent.set('tpViewModel', tpViewModel);
})(app.tpView);