// Function to send an xAPI statement for a textarea input
function sendTextareaXAPIStatement(textareaId, buttonId, activityId) {
  console.log("activityId: ", activityId);
  setupXAPIConfig();

  var actorEmail = "doughahn@gmail.com";
  var actorName = actor;

  // Query the textarea element and store its value for retrieval
  const textareaValue = document.getElementById(textareaId).value;

  // Get the parent path information from the dataset attribute of the textarea wrapper
  const textareaWrapper = document.getElementById(textareaId).parentNode;
  const parentPath = textareaWrapper.dataset.parent;

  // Create an xAPI statement with the textarea response information
  var statement = {
      "actor": {
          "mbox": "mailto:" + actorEmail,
          "name": actorName,
          "objectType": "Agent"
      },
      "verb": {
          "id": "http://adlnet.gov/expapi/verbs/answered",
          "display": {"en-US": "answered"}
      },
      "object": {
          "id": "https://doughahn.github.io/chat-souffle/" + activityId,
          "definition": {
              "name": {"en-US": activityId},
              "description": {"en-US": "Answered " + activityId},
          },
          "objectType": "Activity"
      },
      "result": {
          "response": textareaValue
      },
      // Add the parent path information to the context
      "context": {
          "contextActivities": {
              "grouping": [
                  {
                      "id": "https://doughahn.github.io/chat-souffle/paths/" + parentPath,
                      "objectType": "Activity",
                      "definition": {
                          "name": {"en-US": parentPath},
                          "description": {"en-US": "The parent path of the current activity"}
                      }
                  }
              ]
          }
      }
  };

  // Send the xAPI statement
  sendXAPIStatement(statement, buttonId);

  // Disable the submit button after sending the xAPI statement
  document.getElementById(buttonId).disabled = true;
}

// Function to check if the textarea is empty or not
function checkTextareaNotEmpty(textareaId, buttonId) {
  const textareaValue = document.getElementById(textareaId).value;
  const submitButton = document.getElementById(buttonId);

  // Disable the submit button if the textarea is empty
  if (textareaValue.length === 0) {
      submitButton.disabled = true;
  } else {
      submitButton.disabled = false;
  }
}

// Assign the functions to the global scope
window.sendTextareaXAPIStatement = sendTextareaXAPIStatement;
window.checkTextareaNotEmpty = checkTextareaNotEmpty;
