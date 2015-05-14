'use strict';

app.home = kendo.observable({
    onShow: function() {}  
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
              //window.location.href = "#settingsViewkendo ui navigate to another view";
          var app = new window.kendo.mobile.Application();
        app.navigate( 'aboutView/view.html' );
          
          
              groceryDataSource.read();
          navigator.notification.alert("Logged In");
          }, function() {
              navigator.notification.alert("Unfortunately we could not find your account.");
          });            
            


        },
        cancel: function () {}
    });

    parent.set('settingsViewModel', settingsViewModel);
})(app.home);