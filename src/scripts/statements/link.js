window.sendExternalLinkClickStatement = function(externalLinkID) {
    var href = document.getElementById(externalLinkID).href;
    setupXAPIConfig();
  
    var actorEmail = "doughahn@gmail.com";
    var actorName = actor;
  
    var lastExternalLinkID = localStorage.getItem("last" + externalLinkID + "ClickStatementId");
  
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
  
    var newStatementId = sendXAPIStatement(statement, externalLinkID);
    if (newStatementId) {
      localStorage.setItem("last" + externalLinkID + "ClickStatementId", newStatementId);
    }
  }
  
  function attachExternalLinkEventListener() {
    var externalLinks = $('.external-link');
  
    externalLinks.each(function() {
      $(this).on("click", function(event) {
        event.preventDefault();
        var linkID = $(this).attr('id');
  
        window.sendExternalLinkClickStatement(linkID);
  
        window.open($(this).attr('href'), '_blank');
      });
    });
  }
  
  // Attach the event listeners when the passage is displayed
  $(document).on(':passagedisplay', function() {
    console.log('Passage displayed');
    attachExternalLinkEventListener();
  });