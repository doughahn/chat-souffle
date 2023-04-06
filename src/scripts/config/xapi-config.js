// xapi-config.js

// Use jQuery's $.when() method to ensure both the CryptoJS and xAPIWrapper libraries are loaded
// before executing the setupXAPIConfig() function.
$.when(loadCryptoJS, loadXAPIWrapper).done(function () {
    setupXAPIConfig();
});

// This function sets up the xAPI configuration based on the environment ('development' or 'production').
function setupXAPIConfig() {
    // Test data LRS (Learning Record Store) configuration for the development environment.
    const devConf = {
        "endpoint": "https://sample-lrs-befogih.lrs.io/xapi/",
        "auth": "Basic " + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse("coikpi:rolzak"))
    };

    // Production data LRS configuration for the production environment.
    const prodConf = {
        "endpoint": "https://chat-souffle.lrs.io/xapi/",
        "auth": "Basic " + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse("gaodun:ujgizo"))
    };

    // Set the environment variable to either 'development' or 'production'.
    const environment = 'development';

    // Change the xAPI configuration based on the environment variable.
    if (environment === 'development') {
        ADL.XAPIWrapper.changeConfig(devConf); // Use the development configuration.
    } else {
        ADL.XAPIWrapper.changeConfig(prodConf); // Use the production configuration.
    }
}
