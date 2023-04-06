// ======================================
// Nav Items
// ======================================

// This section handles the click events for navigation items like forward, backward, restart, and saves buttons.
// It defines an object named ids containing the IDs, names, and descriptions for each navigation item.
// It iterates through the object keys, adds a click event listener to each element, and sends an xAPI statement when the user clicks the navigation item.

const ids = {
    "history-forward": {
      name: "Navigation Click Forward",
      description: "the user clicked the forward button"
    },
    "history-backward": {
      name: "Navigation Click Backward",
      description: "the user clicked the backward button"
    },
    "menu-item-restart": {
      name: "Navigation Click Restart",
      description: "the user clicked the restart button"
    },
    "menu-item-saves": {
      name: "Navigation Click Saves",
      description: "the user clicked the saves button"
    }
  };
  
  const passageName = "My Passage Name"; // Define the passageName variable
  
  Object.keys(ids).forEach(function(id) {
    const element = document.getElementById(id);
    element.addEventListener("click", function() {
      var passageName = passage();
      var navigationDescription = ids[id].description + " from " + passageName;
      
      // xAPI stuff
      setupXAPIConfig();
    
      var statement = {
        "actor": {
          "mbox": "mailto:doughahn@gmail.com",
          "name": actor,
          "objectType": "Agent"
        },
        "verb": {
          "id": "https://w3id.org/xapi/dod-isd/verbs/interacted",
          "display": { "en-US": "answered" }
        },
        "object": {
          "id": "https://doughahn.github.io/chat-souffle/" + id,
          "definition": {
            "name": { "en-US": ids[id].name },
            "description": { "en-US": ids[id].description },
          },
          "objectType": "Activity"
        },
        "result": {
          "response": navigationDescription
        }
      };
    
      sendXAPIStatement(statement);
      // end xAPI stuff
      console.log(navigationDescription);
    });
  });


// ======================================
// Buttons
// ======================================  

// This section defines a generic sendButtonClickStatement function that takes the button ID as an argument and sends an xAPI statement when the button is clicked.
// It also defines functions for handling specific button click events (e.g., handleButtonStartSurvey1, handleButtonSurvey1to2, etc.) that call the generic function with the corresponding button ID.

function sendButtonClickStatement(buttonId) {
    setupXAPIConfig();
  
    var actorEmail = "doughahn@gmail.com";
    var actorName = actor
  
    // Retrieve the last statement ID from localStorage
    var lastStatementId = localStorage.getItem("last" + buttonId + "ClickStatementId");
  
    if (lastStatementId) {
      sendVoidStatement(actorEmail, actorName, lastStatementId, function (err, xhr) {
        if (err && err.status !== 200 && err.status !== 204) {
          console.log('xAPI void statement send error:', err);
        } else {
          console.log('xAPI void statement sent, response:', err.status);
        }
      });
    }
  
    var statement = {
      "actor": {
        "mbox": "mailto:" + actorEmail,
        "name": actorName,
        "objectType": "Agent"
      },
      "verb": {
        "id": "http://adlnet.gov/expapi/verbs/interacted",
        "display": { "en-US": "interacted" }
      },
      "object": {
        "id": "https://doughahn.github.io/chat-souffle/" + buttonId,
        "definition": {
          "name": { "en-US": buttonId + " Click Test" },
          "description": { "en-US": "User Interacted with the " + buttonId + " Button." },
        },
        "objectType": "Activity"
      },
      "result": {
        "response": "User clicked the " + buttonId + " button."
      },
      "context": getContextWithExperienceLevel() // Include the context with the category
    };
  
    var newStatementId = sendXAPIStatement(statement, buttonId);
    if (newStatementId) {
      // Store the new statement ID in localStorage
      localStorage.setItem("last" + buttonId + "ClickStatementId", newStatementId);
    }
  }
  
// Start Page button to Survey 1
window.handleButtonStartSurvey1 = function () {
    sendButtonClickStatement('buttonStartSurvey1');
};
  
// Self Assessment Button 1 to 2
window.handleButtonSurvey1to2 = function () {
    sendButtonClickStatement('survey-1-submit');
};
  
  window.handleButtonSurvey2to3 = function () {
    sendButtonClickStatement('survey-2-submit');
};

window.handleButtonSurvey3toText = function () {
    sendButtonClickStatement('survey-3-submit');
};

// ======================================
// Links
// ======================================

// This section defines a generic sendLinkClickStatement function that takes the link ID as an argument and sends an xAPI statement when the link is clicked.
// It also adds event listeners to specific link elements (e.g., self-assess-more-feedback, self-assess-early-exit, etc.) and calls the generic function with the corresponding link ID when the link is clicked.

function sendLinkClickStatement(linkId) {
    setupXAPIConfig();

    var actorEmail = "doughahn@gmail.com";
    var actorName = actor;

    // Retrieve the last statement ID from localStorage
    var lastStatementId = localStorage.getItem("last" + linkId + "ClickStatementId");

    if (lastStatementId) {
      sendVoidStatement(actorEmail, actorName, lastStatementId, function (err, xhr) {
        if (err && err.status !== 200 && err.status !== 204) {
          console.log('xAPI void statement send error:', err);
        } else {
          console.log('xAPI void statement sent, response:', err.status);
        }
      });
    }

    var statement = {
      "actor": {
        "mbox": "mailto:" + actorEmail,
        "name": actorName,
        "objectType": "Agent"
      },
      "verb": {
        "id": "http://adlnet.gov/expapi/verbs/interacted",
        "display": { "en-US": "interacted" }
      },
      "object": {
        "id": "https://doughahn.github.io/chat-souffle/" + linkId,
        "definition": {
          "name": { "en-US": linkId + " Click Test" },
          "description": { "en-US": "User Interacted with the " + linkId + " Link." },
        },
        "objectType": "Activity"
      },
      "result": {
        "response": "User clicked the " + linkId + " link."
      },
      "context": getContextWithExperienceLevel() // Include the context with the category
    };

    var newStatementId = sendXAPIStatement(statement, linkId);
    if (newStatementId) {
      // Store the new statement ID in localStorage
      localStorage.setItem("last" + linkId + "ClickStatementId", newStatementId);
    }
  }

  // Attach the function to the link click event
  document.addEventListener("DOMContentLoaded", function() {
    // Attach the function to the link click event
    document.getElementById("self-assess-more-feedback").addEventListener("click", function() {
      sendLinkClickStatement("self-assess-more-feedback");
    });
  
    document.getElementById("self-assess-early-exit").addEventListener("click", function() {
      sendLinkClickStatement("self-assess-early-exit");
    });

    document.getElementById("provided-criteria").addEventListener("click", function() {
      sendLinkClickStatement("provided-criteria");
    });
  });
  
// ======================================
// Completed Button
// ======================================

// This section defines the send_completion function that sends an xAPI statement when the user clicks the "completed" button.
// It sets the verb display to "completed" to indicate that the user has completed the self-assessment and disables the button after sending the xAPI statement.

  window.send_completion = function () {
    setupXAPIConfig();
  
    var actorEmail = "doughahn@gmail.com";
    var actorName = actor;
  
    // Retrieve the last statement ID from localStorage
    var lastStatementId = localStorage.getItem("lastTestButtonClickStatementId");
  
    if (lastStatementId) {
      sendVoidStatement(actorEmail, actorName, lastStatementId, function (err, xhr) {
        if (err && err.status !== 200 && err.status !== 204) {
          console.log('xAPI void statement send error:', err);
        } else {
          console.log('xAPI void statement sent, response:', err.status);
        }
      });
    }
  
    var statement = {
      "actor": {
        "mbox": "mailto:" + actorEmail,
        "name": actorName,
        "objectType": "Agent"
      },
      "verb": {
        "id": "http://adlnet.gov/expapi/verbs/interacted",
        "display": { "en-US": "completed" }
      },
      "object": {
        "id": "https://doughahn.github.io/chat-souffle/completed-self-assessment-early-release",
        "definition": {
          "name": { "en-US": "Completed Self Assessment on early release" },
          "description": { "en-US": "User Completed Self Assessment on early release." },
        },
        "objectType": "Activity"
      },
      "result": {
        "response": "User Completed Self Assessment on early release."
      },
      "context": getContextWithExperienceLevel() 
    };
  
    var newStatementId = sendXAPIStatement(statement, 'completedButton');
    if (newStatementId) {
      // Store the new statement ID in localStorage
      localStorage.setItem("completedButton", newStatementId);

      // Disable the button
      var button = document.getElementById('completedButton');
      button.disabled = true;
    }
  };