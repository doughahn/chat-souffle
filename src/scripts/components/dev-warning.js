// alert users they're on the dev LRS. Visual check to keep users outta the danger zone. 

$(document).on(':passagerender', function (event, eventData) {
    var warningBannerText = "Using Dev LRS";
    var usingDevEnv = State.variables.devConf;
    var usingProdEnv = State.variables.prodConf;
  
    if (usingDevEnv && !usingProdEnv) {
      var warningBanner = document.createElement('div');
      warningBanner.innerHTML = warningBannerText;
      warningBanner.style.backgroundColor = 'red';
      warningBanner.style.color = 'white';
      warningBanner.style.fontWeight = 'bold';
      warningBanner.style.padding = '5px';
      warningBanner.style.position = 'fixed';
      warningBanner.style.top = '0';
      warningBanner.style.left = '0';
      warningBanner.style.width = '100%';
      warningBanner.style.zIndex = '1000';
  
      eventData.content.appendChild(warningBanner);
    }
  });