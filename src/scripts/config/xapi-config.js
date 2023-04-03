function setupXAPIConfig() {
    // test data LRS
    var devConf = {
        "endpoint": "https://sample-lrs-befogih.lrs.io/xapi/",
        "auth": "Basic " + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse("coikpi:rolzak"))
    };

    // prod LRS
    var conf = {
        "endpoint": "https://chat-souffle.lrs.io/xapi/",
        "auth": "Basic " + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse("gaodun:ujgizo"))
    };
    
    ADL.XAPIWrapper.changeConfig(devConf);
}
