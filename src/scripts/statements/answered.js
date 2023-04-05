// Function to send the xAPI statement
function sendTextareaXAPIStatement(textareaId, buttonId, activityId) {
    console.log("activityId: ", activityId);
    setupXAPIConfig();
  
    var actorEmail = "doughahn@gmail.com";
    var actorName = actor;
  
    // Query the textarea element and store its value as a const for retrieval
    const textareaValue = document.getElementById(textareaId).value;
  
    var statement = {
      "actor": {
        "mbox": "mailto:" + actorEmail,
        "name": actorName,
        "objectType": "Agent"
      },
      "verb": {
        "id": "http://adlnet.gov/expapi/verbs/answered",
        "display": { "en-US": "answered" }
      },
      "object": {
        "id": "https://doughahn.github.io/chat-souffle/" + activityId,
        "definition": {
          "name": { "en-US": "Textarea Sample" },
          "description": { "en-US": "Input Area Sample" },
        },
        "objectType": "Activity"
      },
      "result": {
        "response": textareaValue
      }
    };
  
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
  