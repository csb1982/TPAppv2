'use strict';

// Test
function onPushNotificationReceived(e) {
    alert(JSON.stringify(e));

};
// test end

(function () {
    var app = {
        data: {}
    };

    var bootstrap = function () {
        $(function () {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                skin: 'flat',
                initial: 'components/home/view.html'
            });
        });
    };

    if (window.cordova) {
        document.addEventListener('deviceready', function () {
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();

                // Test
                var everlive = new Everlive({
                    appId: 'yxf3e7fkvkmpk563',
                    scheme: 'http' // switch this to 'https' if you'd like to use TLS/SSL encryption and if it is included in your subscription tier
                });

                var devicePushSettings = {
                    iOS: {
                        badge: 'true',
                        sound: 'true',
                        alert: 'true'
                    },
                    android: {
                        projectNumber: '488561349376'
                    },
                    wp8: {
                        channelName: 'EverlivePushChannel'
                    },
                    notificationCallbackIOS: onPushNotificationReceived,
                    notificationCallbackAndroid: onPushNotificationReceived,
                    notificationCallbackWP8: onPushNotificationReceived
                };

                everlive.push.register(devicePushSettings, function () {
                    alert("Successful registration in Telerik Platform. You are ready to receive push notifications.");
                }, function (err) {
                    alert("Error: " + err.message);
                });
                // Test End
            }
            bootstrap();
        }, false);
    } else {
        bootstrap();
    }



    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li.active').removeClass('active');
        currentItem.addClass('active');
    };

    window.app = app;

    app.isOnline = function () {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };

    app.openLink = function (url) {
        if (url.substring(0, 4) === 'geo:' && device.platform === 'iOS') {
            url = 'http://maps.apple.com/?ll=' + url.substring(4, url.length);
        }

        window.open(url, '_system');
        if (window.event) {
            window.event.preventDefault && window.event.preventDefault();
            window.event.returnValue = false;
        }
    };

    // start kendo binders
    // end kendo binders
    app.showFileUploadName = function (itemViewName) {
        $('.' + itemViewName).off('change', 'input[type=\'file\']').on('change', 'input[type=\'file\']', function (event) {
            var target = $(event.target),
                inputValue = target.val(),
                fileName = inputValue.substring(inputValue.lastIndexOf('\\') + 1, inputValue.length);

            $('#' + target.attr('id') + 'Name').text(fileName);
        });

    };

    app.clearFormDomData = function (formType) {
        $.each($('.' + formType).find('input:not([data-bind]), textarea:not([data-bind])'), function (key, value) {
            var domEl = $(value),
                inputType = domEl.attr('type');

            if (domEl.val().length) {

                if (inputType === 'file') {
                    $('#' + domEl.attr('id') + 'Name').text('');
                }

                domEl.val('');
            }
        });
    };

} ());

// START_CUSTOM_CODE_kendoUiMobileApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_kendoUiMobileApp