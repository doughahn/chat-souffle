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

window.incrementTrackCompletions = function() {
    setup.trackCompletions++;
    console.log("Track completions: " + setup.trackCompletions);

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
            "id": "https://example.com/tracks/" + setup.currentIterationId,
            "definition": {
                "name": {"en-US": "Track " + setup.currentIterationId},
                "description": {"en-US": "Loop " + setup.trackCompletions + " completed"}
            }
        }
    };

    // Send the xAPI statement
    ADL.XAPIWrapper.sendStatement(statement);
    console.log(statement);
};