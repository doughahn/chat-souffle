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