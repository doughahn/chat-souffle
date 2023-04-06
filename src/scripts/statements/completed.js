// Initialize the variables
setup.trackStarts = 0;
setup.trackCompletions = 0;
setup.iterationActivities = {};
setup.currentIterationId = null;
setup.trackStartsTrack2 = 0;

// Save and load custom data in metadata
Config.saves.onSave = function (save) {
    save.metadata.iterationActivities = setup.iterationActivities;
};

Config.saves.onLoad = function (save) {
    if (save.metadata.iterationActivities) {
        setup.iterationActivities = save.metadata.iterationActivities;
    }
};

window.handleXAPIClick = function(event) {
  var buttonId = event.target.id;
  window.handleButtonClick(buttonId);
};

window.handleButtonClick = function(buttonId) {
  setup.currentIterationId = "iteration_" + (setup.trackStarts + 1);
  window.incrementTrackCompletions(setup.currentIterationId, buttonId);
};


window.incrementTrackCompletions = function(iterationId, buttonId) {
  setup.trackCompletions++;
  console.log("Track completions: " + setup.trackCompletions);

  if (iterationId) {
      // Build the xAPI statement
      var statement = {
          "actor": {
              "mbox": "mailto:learner@example.com"
          },
          "verb": {
              "id": "https://w3id.org/xapi/adb/verbs/completed",
              "display": {"en-US": "completed"}
          },
          "object": {
              "id": "https://example.com/tracks/" + iterationId + "/button/" + buttonId,
              "definition": {
                  "name": {"en-US": "Track " + iterationId + " - Button " + buttonId},
                  "description": {"en-US": "Loop # " + setup.trackCompletions + " completed"}
              }
          }
      };

      // Send the xAPI statement
      sendXAPIStatement(statement);
  }
};


window.addCompleteTrackListener = function() {
  // Target buttons with the shared class
  var buttons = document.getElementsByClassName("complete-track-1");

  // Add event listeners to each button
  for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function(event) {
          var buttonId = event.target.id;
          window.handleButtonClick(buttonId);
      });
  }
};


// Second track

window.handleButtonClickTrack2 = function(buttonId) {
  setup.currentIterationId = "iteration_track2_" + (setup.trackStarts + 1);
  window.incrementTrackCompletions(setup.currentIterationId, buttonId);
};

window.handleXAPIClickTrack2 = function(event) {
  var buttonId = event.target.id;
  window.handleButtonClickTrack2(buttonId);
};
