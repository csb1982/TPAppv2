'use strict';

app.tpView = kendo.observable({
    onShow: function() {
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

            //Check if values are stored within background service and are of eclipse format
            if (c > 0) {
                var result = datasourcedata[0].url;               
                if (result.indexOf("https://eclipsetouchpoint.co.uk/") >= 0) {
                    document.getElementById('tpFrame').src = result;
                    document.getElementById('noAdressHeader').style.display = "none";
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