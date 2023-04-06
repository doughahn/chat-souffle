// Define a function to send an xAPI statement for an external link click
window.sendExternalLinkClickStatement = function(externalLinkID) {
  // Get the href attribute of the external link element by its ID
  var href = document.getElementById(externalLinkID).href;
  // Set up the xAPI configuration
  setupXAPIConfig();

  // Define the actor's email and name
  var actorEmail = "doughahn@gmail.com";
  var actorName = actor;

  // Get the last statement ID from localStorage
  var lastExternalLinkID = localStorage.getItem("last" + externalLinkID + "ClickStatementId");

  // Create an xAPI statement for the external link click
  var statement = {
    "actor": {
      "mbox": "mailto:" + actorEmail,
      "name": actorName,
      "objectType": "Agent"
    },
    "verb": {
      "id": "http://adlnet.gov/expapi/activities/link",
      "display": { "en-US": "link" }
    },
    "object": {
      "id": "https://doughahn.github.io/chat-souffle/" + externalLinkID,
      "definition": {
        "name": { "en-US": externalLinkID },
        "description": { "en-US": "User linked the " + externalLinkID + " Link." },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": "User linked the " + externalLinkID + " link with URL: " + href
    }
  };

  // Send the xAPI statement and get the new statement ID
  var newStatementId = sendXAPIStatement(statement, externalLinkID);
  if (newStatementId) {
    // Store the new statement ID in localStorage
    localStorage.setItem("last" + externalLinkID + "ClickStatementId", newStatementId);
  }
}

// Define a function to attach click event listeners to external links
function attachExternalLinkEventListener() {
  // Get all elements with the class 'external-link'
  var externalLinks = $('.external-link');

  // Iterate through each external link element
  externalLinks.each(function() {
    // Attach a click event listener
    $(this).on("click", function(event) {
      // Prevent the default behavior of the link click
      event.preventDefault();
      // Get the ID of the clicked link
      var linkID = $(this).attr('id');

      // Send an xAPI statement for the external link click
      window.sendExternalLinkClickStatement(linkID);

      // Open the link in a new window or tab
      window.open($(this).attr('href'), '_blank');
    });
  });
}

// Attach the event listeners when the passage is displayed
$(document).on(':passagedisplay', function() {
  // Log the passage display event
  console.log('Passage displayed');
  // Call the function to attach event listeners to external links
  attachExternalLinkEventListener();
});
