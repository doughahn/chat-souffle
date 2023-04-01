// this is basically "experienced"actually

$(document).on(':passagedisplay', function(ev) {
  var currentPassage = window.currentPassage || null;
  var incomingPassage = ev.passage;

  if (currentPassage !== null) {
    console.log('Current passage:', currentPassage.title);
  }
  console.log('Incoming passage:', incomingPassage.title);
  
  function waitForCryptoJS() {
    if (typeof CryptoJS !== 'undefined') {
      // Call the new global function to send the xAPI statement
      sendPassageLoadedStatement(currentPassage ? currentPassage.title : null, incomingPassage.title);
    } else {
      setTimeout(waitForCryptoJS, 100);
    }
  }

  waitForCryptoJS();
  
  // Update the window.currentPassage to the incoming passage
  window.currentPassage = incomingPassage;
});

window.sendPassageLoadedStatement = function (currentPassageTitle, passageTitle) {
  setupXAPIConfig();

  var statement = {
    "actor": {
      "mbox": actorMbox,
      "name": actor,
      "objectType": "Agent"
    },
    "verb": {
      "id": "https://w3id.org/xapi/netc/verbs/accessed",
      "display": { "en-US": "accessed" }
    },
    "object": {
      "id": "https://yourdomain.com/twine-game/passages/" + encodeURIComponent(passageTitle),
      "definition": {
        "name": { "en-US": passageTitle },
        "description": { "en-US": "Twine game passage: " + passageTitle },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": currentPassageTitle ?
        "Accessed " + passageTitle + " from " +  currentPassageTitle:
        "Started at " + passageTitle
    }
  };

  sendXAPIStatement(statement);
};
