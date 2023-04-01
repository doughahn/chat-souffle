// Wait for both libraries to load before setting up the event listener
$.when(loadCryptoJS, loadXAPIWrapper).done(function () {
  $(document).on(':passagedisplay', function (ev) {
      var currentPassage = window.currentPassage || null;
      var incomingPassage = ev.passage;

      if (currentPassage !== null) {
          console.log('Current passage:', currentPassage.title);
      }
      console.log('Incoming passage:', incomingPassage.title);

      sendPassageLoadedStatement(currentPassage ? currentPassage.title : null, incomingPassage.title);

      // Update the window.currentPassage to the incoming passage
      window.currentPassage = incomingPassage;
  });
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
          "display": {"en-US": "accessed"}
      },
      "object": {
          "id": "https://yourdomain.com/twine-game/passages/" + encodeURIComponent(passageTitle),
          "definition": {
              "name": {"en-US": passageTitle},
              "description": {"en-US": "Twine game passage: " + passageTitle},
          },
          "objectType": "Activity"
      },
      "result": {
          "response": currentPassageTitle ?
              "Accessed " + passageTitle + " from " + currentPassageTitle :
              "Started at " + passageTitle
      }
  };

  sendXAPIStatement(statement);
};