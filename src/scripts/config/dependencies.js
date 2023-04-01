// Load libraries from external CDNs
const loadCryptoJS = $.getScript("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js",
    function (data, textStatus, jqxhr) {
        console.log('crypto js file loaded');
    }
);

const loadXAPIWrapper = $.getScript("https://gmdoug.sfo3.cdn.digitaloceanspaces.com/xapiwrapper-1-11.js",
    function (data, textStatus, jqxhr) {
        console.log('xAPI wrapper file loaded');
    }
);

// Use $.when() to ensure both libraries are loaded before executing setupXAPIConfig()
$.when(loadCryptoJS, loadXAPIWrapper).done(function () {
    setupXAPIConfig();
});