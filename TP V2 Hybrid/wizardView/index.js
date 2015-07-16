'use strict';

app.wizardView = kendo.observable({
    onShow: function () {}
});

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

            app.mobileApp.navigate("home/view.html");
        }

    });

    parent.set('wizardViewModel', wizardViewModel);
})(app.wizardView);