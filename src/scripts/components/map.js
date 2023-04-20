// The page tracker. 

var completedPassages = [];

// Define all passages in your game here
var allPassages = [
  "Start",
  "self assessment 1",
  "self assessment 2",
  "self assessment 3",
  "self assessment general feedback",
  "complete assessment",
  "set up chatgpt",
  "test drive chatgpt",
  "writing assessments",
  "improve an assessment",
  "provided assessment track 1",
  "provided assessment track 1 freeform",
  "criteria for effective distractors",
  "provided assessment track 2",
  "provided assessment track 2 freeform",
  "provided assessment track 3",
  "provided assessment track 3 freeform",
  "provided assessment track 4",
  "provided assessment track 4 freeform",
  "provided assessment track exit",
  "custom assessment track 1",
  "criteria for effective custom distractors",
  "custom assessment track 2",
  "custom assessment track 2 freeform",
  "custom assessment track 3",
  "custom assessment track 3 freeform",
  "custom assessment track 4",
  "custom assessment track 4 freeform",
  "custom track 5",
  "post survey 1",
  "post survey 2",
  "post survey 3 freeform",
  "thank you"
];

var passageGroups = {
  "self-assessment": [
    "start",
    "self assessment 1", 
    "self assessment 2", 
    "self assessment 3",
    "self assessment exit or feedback",
    "self assessment general feedback",
    "complete assessment"
  ],
  "setup": [
    "set up chatgpt",
    "test drive chatgpt",
    "writing assessments",
    "improve an assessment"
  ],
  "track1": [
    "provided assessment track 1",
    "provided assessment track 1 freeform",
    "criteria for effective distractors",
    "provided assessment track 2 freeform",
    "criteria for effective distractors",
    "provided assessment track 2",
    "provided assessment track 2 freeform",
    "provided assessment track 3",
    "provided assessment track 3 freeform",
    "provided assessment track 4",
    "provided assessment track 4 freeform",
    "provided assessment track exit"
  ],
  "track2": [
    "custom assessment track 1",
    "custom assessment track 2",
    "custom assessment track 2 freeform",
    "custom assessment track 3",
    "custom assessment track 3 freeform",
    "custom assessment track 4",
    "custom track 5"
  ],
  "postSurvey": [
    "post survey 1",
    "post survey 2",
    "post survey 3 freeform",
    "thank you"
  ]
};

// Define titles for each group
var groupTitles = {
  "self-assessment": "Self assessment",
  "setup": "Setup & review criteria",
  "track1": "Track 1: Use a provided assessment",
  "track2": "Track 2: Use a custom assessment",
  "postSurvey": "Complete the course"
};

function updateProgress(passageName) {
  if (completedPassages.indexOf(passageName) === -1) {
    completedPassages.push(passageName);
  }
  displayProgress();
}

$(document).on(':passagedisplay', function(ev) {
  var passageName = ev.passage.title;
  updateProgress(passageName);
  displayProgress();
});

function displayProgress() {
  var progressTracker = document.getElementById("progress-tracker");

  // Check if progressTracker element exists
  if (!progressTracker) {
    return;
  }

  // Create a dictionary to store group divs
  var groupDivs = {};

  // Initialize group divs
  for (var group in passageGroups) {
    var groupTitle = groupTitles[group] || group;
    groupDivs[group] = `<div class="group ${group}"><h5>${groupTitle}</h5>`;
  }

  allPassages.forEach(function(passage) {
    var iconClass = "";

    if (completedPassages.indexOf(passage) !== -1) {
      iconClass = "fa-solid fa-circle completed";
    } else {
      iconClass = "fa-solid fa-circle";
    }

    for (var group in passageGroups) {
      if (passageGroups[group].indexOf(passage) !== -1) {
        groupDivs[group] += `
          <div class="passage-container ${group}">
            <i class="${iconClass}"></i>
          </div>`;
        break;
      }
    }
  });

  // Close the group divs
  for (var group in groupDivs) {
    groupDivs[group] += "</div>";
  }

  // Combine group divs into progressHTML
  var progressHTML = "";
  for (var group in groupDivs) {
    progressHTML += groupDivs[group];
  }

  progressTracker.innerHTML = progressHTML;
}
