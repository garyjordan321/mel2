( function() {
                var insertErrorMessage = function (message) {
                    jQuery('script').each(function (i, e) {
                        var js = jQuery(e)[0].src || '';
                        if (js.indexOf('258048.js') > 0)
                            jQuery(e).after('<p style="color: red">' + message + '</p>');
                    });
                };
                var fetchWidget = function () {
                  Bloomerang.Util.requireJQueryValidation(function() {
                        Bloomerang.useKey('pub_94e806f3-e1aa-11ec-84cc-06feca334f0f');
		  
                        var success = function(result) { 
                            eval(result.WidgetJavascript);
                        };
                        var failure = function() { 
                            insertErrorMessage('EmailSignup form could not be loaded. Please try again later.');
                        };

                        var data = {
                            ServedSecurely: (window.location.protocol == 'https:' || window.location.href.indexOf('http://localhost:') == 0),
                            FormUrl: window.location.href
                        };

                        Bloomerang.Api._post('v1/Widget/258048', data, success, failure);
                    });
                };
                var startBloomerangLoad = function() {
                    if (window.bloomerangLoadStarted == undefined) {
                        window.bloomerangLoadStarted = true;
                        var script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.src = 'https://crm.bloomerang.co/Content/Scripts/Api/Bloomerang-v2.js?nocache=1730300639';
                        document.getElementsByTagName('head')[0].appendChild(script);
                        waitForBloomerangLoad(fetchWidget);
                    }
                    else {
                        waitForBloomerangLoad(fetchWidget);
                    }
                };

                var waitForBloomerangLoad = function(callback) {
                    if (typeof(Bloomerang) === 'undefined' || !Bloomerang._isReady) {
                        setTimeout(function () { waitForBloomerangLoad(callback) }, 500);
                    }
                    else {
                        if (true) {
                            callback();
                        } else {
                            window.bloomerangLoadStarted = undefined;
                            Bloomerang = undefined; // The version of Blomerang.js is not what we want. So blow it away and reload.
                            startBloomerangLoad();
                        }
                    }
                };

                startBloomerangLoad();})();