'use strict';

app.wizardView = kendo.observable({
    onShow: function () {
test();

    }
});

var test = function () {
    //app.mobileApp.navigate("aboutView/view.html");
    
    if (localStorage.getItem("username") != undefined && localStorage.getItem("password") != undefined && localStorage.getItem("url") != undefined && localStorage.getItem("page") != undefined) {
                            //var result = localStorage.getItem("key");
                            //alert("In result = " + result);
    alert("Wizard Send over to tp view");
    app.mobileApp.navigate("tpView/view.html");

                            //var username = localStorage.getItem("username");
                            //var password = localStorage.getItem("password");
                            //var url = localStorage.getItem("url");
                            //var page = localStorage.getItem("page");

                            //alert("In result = " + username+ " " +password+ " " +url+ " "+page);
                           // app.mobileApp.navigate("tpView/view.html");
                            //location = "tpView/view.html";
                            //location = "home/view.html";

                        }
    
};

(function (parent) {





    //Select data source to transport
    var dataSource = new kendo.data.DataSource({
        type: "everlive",
        transport: {
            typeName: "userSettings"
        }
    });




    var wizardViewModel = kendo.observable({
        

        //****************** On save button click ******************
        submit: function () {

            app.mobileApp.navigate("registerView/view.html");
        }

    });

    parent.set('wizardViewModel', wizardViewModel);
})(app.wizardView);