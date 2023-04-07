// Initialize the variables
setup.trackStarts = 0;
setup.trackCompletions = 0;
setup.iterationActivities = {};
setup.currentIterationId = null;
setup.trackStartsTrack2 = 0;
setup.trackCompletionsTrack2 = 0;

// Save and load custom data in metadata
Config.saves.onSave = function (save) {
    save.metadata.iterationActivities = setup.iterationActivities;
};

Config.saves.onLoad = function (save) {
    if (save.metadata.iterationActivities) {
        setup.iterationActivities = save.metadata.iterationActivities;
    }
};

// Handle xAPI clicks
window.handleXAPIClick = function(event) {
  var buttonId = event.target.id;
  window.handleButtonClick(buttonId);
};

// Increment track completions and send xAPI statement
window.handleButtonClick = function(buttonId) {
  setup.currentIterationId = "iteration_" + (setup.trackStarts + 1);
  window.incrementTrackCompletions(setup.currentIterationId, buttonId);
};

// Increment track completions and build xAPI statement
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
              "id": "https://doughahn.github.io/chat-souffle/" + iterationId + "/button/" + buttonId,
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

// Add event listener for completion tracking
window.addCompleteTrackListener = function() {
  // Target buttons with the shared classes
  var buttonsTrack1 = document.getElementsByClassName("complete-track-1");
  var buttonsTrack2 = document.getElementsByClassName("complete-track-2");

  // Add event listeners to each button for Track 1
  for (var i = 0; i < buttonsTrack1.length; i++) {
      buttonsTrack1[i].addEventListener("click", function(event) {
          var buttonId = event.target.id;
          window.handleButtonClick(buttonId);
      });
  }

  // Add event listeners to each button for Track 2
  for (var i = 0; i < buttonsTrack2.length; i++) {
      buttonsTrack2[i].addEventListener("click", function(event) {
          var buttonId = event.target.id;
          window.handleButtonClickTrack2(buttonId);
      });
  }
};

// Second track

// Handle button click for the second track
window.handleButtonClickTrack2 = function(buttonId) {
  setup.currentIterationId = "iteration_track2_" + (setup.trackStartsTrack2 + 1);
  window.incrementTrackCompletionsTrack2(setup.currentIterationId, buttonId);
};

// Handle xAPI click for the second track
window.handleXAPIClickTrack2 = function(event) {
  var buttonId = event.target.id;
  window.handleButtonClickTrack2(buttonId);
};

// Increment track completions for the second track and build xAPI statement
window.incrementTrackCompletionsTrack2 = function(iterationId, buttonId) {
  setup.trackCompletionsTrack2++;
  console.log("Track 2 completions: " + setup.trackCompletionsTrack2);

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
              "id": "https://doughahn.github.io/chat-souffle/" + iterationId + "/button/" + buttonId,
              "definition": {
                  "name": {"en-US": "Track " + iterationId + " - Button " + buttonId},
                  "description": {"en-US": "Loop # " + setup.trackCompletionsTrack2 + " completed"}
              }
          }
      };

      // Send the xAPI statement
      sendXAPIStatement(statement);
  }
};

// Add event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  window.addCompleteTrackListener();
});
