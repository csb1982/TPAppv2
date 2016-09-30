'use strict';

app.home = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home
(function (parent) {
    var homeModel = kendo.observable({
        fields: {
            rememberMe: '',
            emailAddress: '',
            password: '',
            username: '',
        },
        submit: function () {

            console.log('form submitted');

            $('#registerForm').fadeOut();

            var url = 'https://demo.eclipsetouchpoint.co.uk/qatesting331';
            
            $('#iframeContainer').attr('src', url);
            $('#iframeContainer').fadeIn();


        }
    });

    parent.set('homeModel', homeModel);
})(app.home);

// START_CUSTOM_CODE_homeModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeModel