function sendFormXAPIStatement(formId) {
    setupXAPIConfig();
  
    var actorEmail = "doughahn@gmail.com";
    var actorName = actor;

    // Read the parent path name from the form's data attribute
    const formElement = document.getElementById(formId);
    const parentPath = formElement.dataset.parent;
  
    // Retrieve the last statement ID from localStorage
    var lastStatementId = localStorage.getItem("last" + formId + "StatementId");
  
    if (lastStatementId) {
      sendVoidStatement(actorEmail, actorName, lastStatementId, function (err, xhr) {
        if (err && err.status !== 200 && err.status !== 204) {
          console.log('xAPI void statement send error:', err);
        } else {
          console.log('xAPI void statement sent, response:', err.status);
        }
      });
    }
  
    // Query the input name and store it as a const for retrieval
    const formChoice = document.querySelector('input[name="' + formId + '-choice"]:checked').value;
  
    let formChoiceToURI = formChoice.toLowerCase().replace(/\s+/g, '-');

    var statement = {
      "actor": {
        "mbox": "mailto:" + actorEmail,
        "name": actorName,
        "objectType": "Agent"
      },
      "verb": {
        "id": "https://w3id.org/xapi/dod-isd/verbs/chose",
        "display": { "en-US": "answered" }
      },
      "object": {
        "id": "https://doughahn.github.io/chat-souffle/" + formId,
        "definition": {
          "name": { "en-US": formId },
          "description": { "en-US": "the user's choice on " + formId },
        },
        "objectType": "Activity"
      },
      "result": {
        "response": formChoice
      },
      "context": {
        "contextActivities": {
          "parent": [
            {
              "id": "https://doughahn.github.io/chat-souffle/paths/" + parentPath,
              "objectType": "Activity",
              "definition": {
                "name": { "en-US": parentPath },
                "description": { "en-US": "The parent path of the current activity" }
              }
            }
          ],
          "grouping": [
            {
              "id": "https://doughahn.github.io/chat-souffle/groups/" +  formId + "/" + formChoiceToURI,
              "objectType": "Activity",
              "definition": {
                "name": {
                  "en-US": formChoice + " Group"
                },
                "description": {
                  "en-US": "A group for actors who chose " + formChoice + " on " + formId
                }
              }
            }
          ]
        }
      }
    };
    localStorage.setItem("selectedCategoryGroup", formChoice);
    var newStatementId = sendXAPIStatement(statement, formId + '-submit');
    
    if (newStatementId) {
      // Store the new statement ID in localStorage
      localStorage.setItem("last" + formId + "StatementId", newStatementId);
  
      // Add success class to the button and remove it after 2 seconds
      const submitButton = document.getElementById(formId + '-submit');
      submitButton.classList.remove('.resubmit-success');
      submitButton.classList.add('.success');
  
      // Change the button text to "Success!" and change it to "Re-submit" after 2 seconds
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Success!";
      setTimeout(() => {
        submitButton.textContent = "Re-submit";
        submitButton.classList.remove('.success');
        submitButton.classList.add('.resubmit-success');
      }, 2000);
    }
  }
  
  // Assign the function to the global scope
window.sendFormXAPIStatement = sendFormXAPIStatement;

// No void

function sendFormXAPIStatementNoVoid(formId) {
  setupXAPIConfig();

  var actorEmail = "doughahn@gmail.com";
  var actorName = actor;

  // Read the parent path name from the form's data attribute
  const formElement = document.getElementById(formId);
  const parentPath = formElement.dataset.parent;

  // Query the input name and store it as a const for retrieval
  const formChoice = document.querySelector('input[name="' + formId + '-choice"]:checked').value;

  let formChoiceToURI = formChoice.toLowerCase().replace(/\s+/g, '-');

  var statement = {
      "actor": {
          "mbox": "mailto:" + actorEmail,
          "name": actorName,
          "objectType": "Agent"
      },
      "verb": {
          "id": "https://w3id.org/xapi/dod-isd/verbs/chose",
          "display": { "en-US": "answered" }
      },
      "object": {
          "id": "https://doughahn.github.io/chat-souffle/" + formId,
          "definition": {
              "name": { "en-US": formId },
              "description": { "en-US": "the user's choice on " + formId },
          },
          "objectType": "Activity"
      },
      "result": {
          "response": formChoice
      },
      "context": {
          "contextActivities": {
              "parent": [
                  {
                      "id": "https://doughahn.github.io/chat-souffle/paths/" + parentPath,
                      "objectType": "Activity",
                      "definition": {
                          "name": { "en-US": parentPath },
                          "description": { "en-US": "The parent path of the current activity" }
                      }
                  }
              ],
              "grouping": [
                  {
                      "id": "https://doughahn.github.io/chat-souffle/groups/" +  formId + "/" + formChoiceToURI,
                      "objectType": "Activity",
                      "definition": {
                          "name": {
                              "en-US": formChoice + " Group"
                          },
                          "description": {
                              "en-US": "A group for actors who chose " + formChoice + " on " + formId
                          }
                      }
                  }
              ]
          }
      }
  };
  localStorage.setItem("selectedCategoryGroup", formChoice);
  var newStatementId = sendXAPIStatement(statement, formId + '-submit');

  if (newStatementId) {
      // Store the new statement ID in localStorage
      localStorage.setItem("last" + formId + "StatementId", newStatementId);

      // Add success class to the button and remove it after 2 seconds
      const submitButton = document.getElementById(formId + '-submit');
      submitButton.classList.remove('.resubmit-success');
      submitButton.classList.add('.success');

      // Change the button text to "Success!" and change it to "Re-submit" after 2 seconds
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = "Success!";
      setTimeout(() => {
          submitButton.textContent = "Re-submit";
          submitButton.classList.remove('.success');
          submitButton.classList.add('.resubmit-success');
      }, 2000);
  }
}

// Assign the function to the global scope
window.sendFormXAPIStatementNoVoid = sendFormXAPIStatementNoVoid;
