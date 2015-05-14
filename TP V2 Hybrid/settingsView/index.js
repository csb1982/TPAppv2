'use strict';


app.settingsView = kendo.observable({
    onShow: function () {}
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

    /*
    var groceryDataSource = new kendo.data.DataSource({
        offlineStorage: "User-offline",
        transport: {
            read: {
                url: "https://api.everlive.com/v1/" + apiKey + "/Test",
                dataType: "jsonp"
            }
        },
        schema: {
            data: function (response) {
                return response.Result;
            }
        }
    });
    */
    //Test End
    //***************************************************************************************************



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
          function(data) {
              window.location.href = "#blaa";
              groceryDataSource.read();
          navigator.notification.alert("Logged In");
          }, function() {
              navigator.notification.alert("Unfortunately we could not find your account.");
          });            
            

/*
            //Test Post
            var notification = {
                "Filter": JSON.stringify({
                    'PlatformType': 3
                }),
                "Message": "A generic Android message"
            };

            $.ajax({
                type: "POST",
                url: 'http://api.everlive.com/v1/fVu2MUaaCYHk9fL7/Push/Notifications',
                contentType: "application/json",
                data: JSON.stringify(notification),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    alert("Android SOMETHING HAPPENED!!");
                },
                error: function (error) {
                    //alert(JSON.stringify(error));
                    alert("OH NO!!");
                }
            });
            // End Test Post




            //Test Post
            var notification = {
                "Filter": JSON.stringify({
                    'PlatformType': 4
                }),
                "Message": "A generic iOS message"
            };

            $.ajax({
                type: "POST",
                url: 'http://api.everlive.com/v1/fVu2MUaaCYHk9fL7/Push/Notifications',
                contentType: "application/json",
                data: JSON.stringify(notification),
                success: function (data) {
                    //alert(JSON.stringify(data));
                    alert("iOS SOMETHING HAPPENED!!");
                },
                error: function (error) {
                    //alert(JSON.stringify(error));
                    alert("OH NO!!");
                }
            });
            // End Test Post            





            //alert(settingsViewModel.fields.username + settingsViewModel.fields.password + settingsViewModel.fields.url);

            $("#grocery-list").kendoMobileListView({
                dataSource: groceryDataSource,
                template: "#: Name #"
            });


            //****************************
            // Local database test
            /*
            var dataSource = new kendo.data.DataSource({
                data: [
                    {
                        name: "Jane",
                        password: "30",
                        url: "http://www.bbc.co.uk/"
            },
                    {
                        name: "John",
                        password: "33",
                        url: "http://www.sky.com/"
            }
  ]
            });
            dataSource.fetch(function () {
                //var janeDoe = dataSource.at(0);
                //alert(janeDoe.name); // displays "Jane Doe"


                var datasourcedata = dataSource.data();
                var dataitem = datasourcedata[0].name;
                var dataitem2 = datasourcedata[0].password;
                var dataitem3 = datasourcedata[0].url;

                //var firstItem = dataSource.data()[0];
                dataitem.set('name', 'The updated Name');

                alert("At 0 IN LOCAL " + dataitem + " " + dataitem2 + " " + dataitem3);


            });
*/













/*

            //*****************************************
            groceryDataSource.fetch(function () {
                var datasourcedata = groceryDataSource.data();
                var dataitem = datasourcedata[0].Name;

                var firstItem = groceryDataSource.data()[0];
                firstItem.update('Name', 'The updated Name');

                alert("At 0 " + dataitem);
                /* iterate through all data
                                        for (var i = 0; i < datasourcedata.length; i++) {
                                            var dataitem = datasourcedata[i].Name;
                                            var dataitem2 = datasourcedata[0].Name;
                                            alert(dataitem);
                                        }
                                        */
                //*****************************


                //alert("FETCH: ");

                //var json = JSON.parse(data);

                //alert(json["username"]); //mkyong
/*
            });


            // Set Setting values with whats inputted
            var str = settingsViewModel.fields.username;
            var str2 = settingsViewModel.fields.password;
            var str3 = settingsViewModel.fields.url;

            // IF all settings have data
            if (str && str2 && str3) {



                //Update records
                //alert("str " + str + " " + str2 + " " + " " + str3);
                alert("HERE");
            } else {
                if (!str) {
                    //alert("str test " + "Blank");
                }
                if (!str2) {
                    //alert("str 2 test " + "Blank");
                }
                if (!str3) {
                    //alert("str 3 test " + "Blank");
                }

                //alert("str " + "Blank");
            }

            /*
            var str2 = settingsViewModel.fields.url;
            
            if (!st2r || 0 === str2.length) {
				alert("str2 " + str2);
            } else {
                alert("str2 " + "Blank");
            }           
            */

/*
            groceryDataSource.add({
                Name: "Username John"
            });
            groceryDataSource.one("sync", this.close);
            groceryDataSource.sync();







*/
        },
        cancel: function () {}
    });

    parent.set('settingsViewModel', settingsViewModel);
})(app.settingsView);






