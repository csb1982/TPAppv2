'use strict';
app.home = kendo.observable({
    onShow: function () {
        // Show form
        $("#tpForm").show();

        // Get local storage values if present
        var username = localStorage.getItem("username");
        var password = localStorage.getItem("password");

        // Set form values to local storage values
        $("#username").val(username);
        $("#password").val(password);

        // This needs work ********************************
        // Hardcoded values for form
        //$("#userID").val("notifications");.
        //$("#site").val("notifications");

        //$("#userID").val("qatesting331");
        //$("#site").val("qatesting331");

        // Hide form
        //$("#tpForm").hide();

        // Set iframe's height. So that it's full screen
        //var h = $(".km-content").height();
        //$("#tpFrame").height(h);

        // Submit form
        //$("#tpForm").submit();
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

            // Hardcoded values for form
            $("#userID").val(device.uuid);
            $("#site").val("notifications");

            // Hide form
            $("#tpForm").hide();

            // Set iframe's height. So that it's full screen
            var h = $(".km-content").height();
            $("#tpFrame").height(h);

            // Submit form
            $("#tpForm").submit();

            // Get and store username & password in local storage. So user doesn't have to re-enter details everytime 
            var username = $("#username").val();
            var password = $("#password").val();

            localStorage.setItem("username", username);
            localStorage.setItem("password", password);

            // Giving option to user to save or remove saved login details
            /*
            var answer = confirm("Save Login details?");
            if(answer)
            {
                localStorage.setItem("username", username);
                localStorage.setItem("password", password);
            }
            else{
                localStorage.removeItem("username");
                localStorage.removeItem("password");
            }
            */
        },
        cancel: function () { }
    });
    parent.set('homeModel', homeModel);
})(app.home);
