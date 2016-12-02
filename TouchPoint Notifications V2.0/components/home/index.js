'use strict';
app.home = kendo.observable({
    onShow: function () {
localStorage.clear();
document.cookie = "username=John Doe";


/*
$.ajax({

    url : 'https://demo.eclipsetouchpoint.co.uk/notifications',
    type : 'POST',
    data : {
        'userId' : "b045897a33f58eb8",
        'siteId' : "notifications",
        'userName' : "craigtp",
        'password' : "craigtp"
    },
    dataType:'json',
    success : function(data) {              
        alert('Data: '+data);
    },
    error : function(request,error)
    {
        alert("Request: "+JSON.stringify(request));
    }
});

*/


        // Show form
        $("#tpForm").show();
        $("#navBottom").hide();

        // Get local storage values if present
        var username = localStorage.getItem("username");
        var password = localStorage.getItem("password");

        // Set form values to local storage values
        $("#username").val(username);
        $("#password").val(password);

        if(username && password)
        {
            
            // Hardcoded values for form
            $("#userID").val(device.uuid);
            $("#site").val("notifications");

            // Hide form
            $("#tpForm").hide();

            var h = $(".km-content").height();
            $("#tpFrame").height(h);
            //Set iframe's height. So that it's full screen
            /*
            $("#navBottom").show();
            var h = $(".km-content").height();
            h = h - 50;
            $("#tpFrame").height(h);
            $("#tpFrame").show();

            $(".km-content").css("background-color", "black");
            $('.km-content').css('background-image', 'none');
            */

            //Submit form
            $("#tpForm").submit();            
        }
     },
    afterShow: function () {
    }
});

(function (parent) {

    // On orientation change re set iframe height
    $(window).on("orientationchange",function(){
        var h = $(".km-content").height();
        $("#tpFrame").height(h);
    });

    var homeModel = kendo.observable({
        fields: {
            rememberMe: '',
            emailAddress: '',
            password: '',
            username: '',
        },
        submit: function () {

            $("#navBottom").show();

            // Hardcoded values for form
            $("#userID").val(device.uuid);
            $("#site").val("notifications");
            //$("#site").val("qatesting331");

            // Hide form
            $("#tpForm").hide();

            var h = $(".km-content").height();
            $("#tpFrame").height(h);
            // Set iframe's height. So that it's full screen
            /*
            var h = $(".km-content").height();
            h = h - 50;
            $("#tpFrame").height(h);

            $("#tpFrame").show();
            $(".km-content").css("background-color", "black");
            $('.km-content').css('background-image', 'none');

            */

            // Submit form
            $("#tpForm").submit();

            // Get and store username & password in local storage. So user doesn't have to re-enter details everytime 
            var username = $("#username").val();
            var password = $("#password").val();

            localStorage.setItem("username", username);
            localStorage.setItem("password", password);

            // test

function myFunction() {
    setTimeout(function(){

         
var x = document.cookie;
alert(x);
         }, 9000);
}

myFunction();



/*
function getCook(cookiename) 
  {
  // Get name followed by anything except a semicolon
  var cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
  }

var cookieValue = getCook('test');
alert(cookieValue);
*/

        },
        cancel: function () { },
        clear: function () {
            /*
            localStorage.clear();
            $("#tpForm").show();
            $("#navBottom").hide();
            
            $("#tpFrame").hide();
            $('.km-content').css('background-image', 'url("images/backgroundForPhone.jpg")');
            */

        }
    });
    parent.set('homeModel', homeModel);
})(app.home);
