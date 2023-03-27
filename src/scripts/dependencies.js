// load libraries from external CDNs because it's easier than 
$.getScript("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js",
    function (data, textStatus, jqxhr) {
        console.log('crypto js file loaded');
    }
);

$.getScript("https://gmdoug.sfo3.cdn.digitaloceanspaces.com/xapiwrapper-1-11.js",
    function (data, textStatus, jqxhr) {
        console.log('xAPI wrapper file loaded');
    }
);
