// Initialize the variables
setup.trackStarts = 0;
setup.trackCompletions = 0;
setup.iterationActivities = {};
setup.currentIterationId = null;

// Save and load custom data in metadata
Config.saves.onSave = function (save) {
    save.metadata.iterationActivities = setup.iterationActivities;
};

Config.saves.onLoad = function (save) {
    if (save.metadata.iterationActivities) {
        setup.iterationActivities = save.metadata.iterationActivities;
    }
};

window.incrementTrackCompletions = function(iterationId) {
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
              "id": "https://example.com/tracks/" + iterationId,
              "definition": {
                  "name": {"en-US": "Track " + iterationId},
                  "description": {"en-US": "Loop # " + setup.trackCompletions + " completed"}
              }
          }
      };

      // Send the xAPI statement
      sendXAPIStatement(statement);
  }
};


window.addCompleteTrackListener = function() {
  var button = document.getElementById("completeTrackBtn");
  if (button) {
      button.addEventListener("click", function() {
          setup.currentIterationId = "iteration_" + (setup.trackStarts + 1);
          window.incrementTrackCompletions(setup.currentIterationId);
      });
  }
};