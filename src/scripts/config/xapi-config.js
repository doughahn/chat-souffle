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
    setupXAPIConfig.environment = 'development';

    // Change the configuration based on the environment
    if (setupXAPIConfig.environment === 'production') {
        ADL.XAPIWrapper.changeConfig(devConf);
    } else {
        ADL.XAPIWrapper.changeConfig(prodConf);
    }
}


function displayDevWarningBanner() {
    var warningBannerText = "Using Dev LRS";
    var environment = setupXAPIConfig.environment;

    if (environment === 'development') {
        var warningBanner = document.createElement('div');
        warningBanner.innerHTML = warningBannerText;
        warningBanner.style.backgroundColor = 'yellow';
        warningBanner.style.color = 'black';
        warningBanner.style.textAlign = 'center';
        warningBanner.style.fontWeight = 'bold';
        warningBanner.style.padding = '1rem';
        warningBanner.style.position = 'fixed';
        warningBanner.style.bottom = '0';
        warningBanner.style.left = '0';
        warningBanner.style.width = '100%';
        warningBanner.style.zIndex = '1000';

        document.body.appendChild(warningBanner);
    }
}

$(document).on(':passagedisplay', function (event) {
    setTimeout(displayDevWarningBanner, 0);
});


