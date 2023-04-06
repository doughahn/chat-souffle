// This script sets up an event listener for passage display events in a Twine game.
// When a passage is displayed, it sends an xAPI statement about the passage being loaded.

// Wait for both the CryptoJS and xAPIWrapper libraries to load before setting up the event listener.
$.when(loadCryptoJS, loadXAPIWrapper).done(function () {
    // Add a ':passagedisplay' event listener to the document.
    $(document).on(':passagedisplay', function (ev) {
        // Get the current and incoming passage information.
        var currentPassage = window.currentPassage || null;
        var incomingPassage = ev.passage;

        // Log the current and incoming passage titles.
        if (currentPassage !== null) {
            console.log('Current passage:', currentPassage.title);
        }
        console.log('Incoming passage:', incomingPassage.title);

        // Send an xAPI statement for the passage loaded event.
        // If there's a current passage, use its title; otherwise, use 'null' as the starting point.
        sendPassageLoadedStatement(currentPassage ? currentPassage.title : null, incomingPassage.title);

        // Update the window.currentPassage to the incoming passage.
        window.currentPassage = incomingPassage;
    });
});

// This function sends an xAPI statement when a passage is loaded in the Twine game.
// It takes the current passage title (if any) and the title of the passage being loaded.
window.sendPassageLoadedStatement = function (currentPassageTitle, passageTitle) {
    // Set up the xAPI configuration.
    setupXAPIConfig();

    // Create an xAPI statement with the passage access information.
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
            "id": "https://doughahn.github.io/chat-souffle/" + encodeURIComponent(passageTitle),
            "definition": {
                "name": {"en-US": passageTitle},
                "description": {"en-US": "Twine game passage: " + passageTitle},
            },
            "objectType": "Activity"  
        },
        // Set the result response based on whether there's a current passage title.
        "result": {
            "response": currentPassageTitle ?
                "Accessed " + passageTitle + " from " + currentPassageTitle :
                "Started at " + passageTitle
        }
    };

    // Send the xAPI statement using the 'sendXAPIStatement' function.
    sendXAPIStatement(statement);
};
