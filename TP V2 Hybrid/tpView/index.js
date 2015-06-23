'use strict';

app.tpView = kendo.observable({
    onShow: function () {
        alert("in tp");
        /*
        document.getElementById("username").value = "this is a test";
        var username = localStorage.getItem("username");
        document.getElementById("password").value = username;
        */


        /*
                //test
                if (localStorage.getItem("username") != undefined && localStorage.getItem("password") != undefined && localStorage.getItem("url") != undefined && localStorage.getItem("page") != undefined) {
                    alert("HERE");
                    var username = localStorage.getItem("username");
                    var password = localStorage.getItem("password");
                    var url = localStorage.getItem("url");
                    var page = localStorage.getItem("page");
        navigator.notification.alert("LOCAL settings " + username + " " + password + " " + url);
                    document.getElementById("username").value = username;
                    document.getElementById("password").value = password;
                    document.getElementById("site").value = page;
                    
                    submitform();


                } else {
                    alert("No such record!!!");
                }
                //test end
        */





        //submitform();
        // Hide form
        // document.getElementById('tpForm').style.display = "none";
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

                    navigator.notification.alert("tp settings " + username + " " + password + " " + url);
                    localStorage.setItem("username", username);
                    localStorage.setItem("password", password);
                    localStorage.setItem("url", url);
                    localStorage.setItem("page", page);

                    
                    document.getElementById("username").value = username;
                    document.getElementById("password").value = password;
                    document.getElementById("site").value = page;
                    
                    // Old code
                    //var elem1 = document.getElementById("username");
                    //elem1.value = username;

                    //var elem2 = document.getElementById("password");
                    //elem2.value = password;

                    //var elem3 = document.getElementById("site");
                    //elem3.value = page;


                    // Enable when releasing for live 
                    //document.getElementById("tpForm").action = url;

                    //document.getElementById('noAdressHeader').style.display = "none";
                    submitform();

                } else {
                    navigator.notification.alert("Url does not match site address");
                    app.mobileApp.navigate("settingsView/view.html");
                }

            } else {
                navigator.notification.alert("Using local data");
                //test
                if (localStorage.getItem("username") != undefined && localStorage.getItem("password") != undefined && localStorage.getItem("url") != undefined && localStorage.getItem("page") != undefined) {
                    alert("HERE");
                    var username = localStorage.getItem("username");
                    var password = localStorage.getItem("password");
                    var url = localStorage.getItem("url");
                    var page = localStorage.getItem("page");
                    navigator.notification.alert("LOCAL settings " + username + " " + password + " " + url);
                    document.getElementById("username").value = username;
                    document.getElementById("password").value = password;
                    document.getElementById("site").value = page;

                    submitform();


                } else {
                    alert("No data");
                    app.mobileApp.navigate("wizardView/view.html");
                }
                //test end
            }

        });

    }
});