'use strict';

app.tpView = kendo.observable({
    onShow: function () {
//submitform();
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
            var datasourcedata = DataSource.data();
            var c = 0;

            // iterate through all data
            for (var i = 0; i < datasourcedata.length; i++) {
                c++;
            }

            //Check if values are stored within background service and are of eclipse format
            if (c > 0) {
                var result = datasourcedata[0].url;
                if (result.indexOf("https://eclipsetouchpoint.co.uk/") >= 0) {

                    var username = datasourcedata[0].username;
                    var password = datasourcedata[0].password;
                    var url = datasourcedata[0].url;
                    var page = url.substring(url.lastIndexOf('/') + 1);

                    var elem1 = document.getElementById("username");
                    elem1.value = username;

                    var elem2 = document.getElementById("password");
                    elem2.value = password;

                    var elem3 = document.getElementById("site");
                    elem3.value = page;

                    // Enable when releasing for live 
                    //document.getElementById("tpForm").action = url;

                    document.getElementById('noAdressHeader').style.display = "none";
                    submitform();

                } else {
                    navigator.notification.alert("Url does not match site address");
                    app.mobileApp.navigate("settingsView/view.html");
                }

            } else {
                navigator.notification.alert("Url does not match site address");
                app.mobileApp.navigate("settingsView/view.html");
            }

        });
        
    }
});