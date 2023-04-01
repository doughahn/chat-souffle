function setupXAPIConfig() {
    var conf = {
        "endpoint": "https://sample-lrs-befogih.lrs.io/xapi/",
        "auth": "Basic " + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse("coikpi:rolzak"))
    };

    ADL.XAPIWrapper.changeConfig(conf);
}


