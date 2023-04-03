// xapi-config.js

// Use $.when() to ensure both libraries are loaded before executing setupXAPIConfig()
$.when(loadCryptoJS, loadXAPIWrapper).done(function () {
    setupXAPIConfig();
});

function setupXAPIConfig() {
    // Test data LRS
    const devConf = {
        "endpoint": "https://sample-lrs-befogih.lrs.io/xapi/",
        "auth": "Basic " + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse("coikpi:rolzak"))
    };

    // Production data LRS
    const prodConf = {
        "endpoint": "https://chat-souffle.lrs.io/xapi/",
        "auth": "Basic " + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse("gaodun:ujgizo"))
    };

    // Set environment to 'development' or 'production'
    const environment = 'development';

    // Change the configuration based on the environment
    if (environment === 'development') {
        ADL.XAPIWrapper.changeConfig(devConf);
    } else {
        ADL.XAPIWrapper.changeConfig(prodConf);
    }
}
