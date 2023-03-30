// ======================================
// Nav Items
// ======================================

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