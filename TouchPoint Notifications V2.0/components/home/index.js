'use strict';

app.home = kendo.observable({
    onShow: function () {
        // Show form
        $("#tpForm").show();
        
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
            $("#userID").val("qatesting331");
            $("#site").val("qatesting331");

            // Hide form
            $("#tpForm").hide();

            // Set iframe's height. So that it's full screen
            var h = $(".km-content").height();
            $("#tpFrame").height(h);

            // Submit form
            $("#tpForm").submit();                     
        },
        cancel: function () { }
    });
    parent.set('homeModel', homeModel);
})(app.home);
