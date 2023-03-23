$(function () {

    function setupXAPIConfig() {
        var conf = {
            "endpoint": "https://sample-lrs-befogih.lrs.io/xapi/",
            "auth": "Basic " + CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse("coikpi:rolzak"))
        };
  
        ADL.XAPIWrapper.changeConfig(conf); 
    }
    
    function sendXAPIStatement(statement, elementId) {
      ADL.XAPIWrapper.sendStatement(statement, function(err, xhr) {
          if (err && err.status !== 200 && err.status !== 204) {
              console.log('xAPI statement send error:', err);
          } else {
              console.log('xAPI statement sent, response:', err.status);
              if (err.status === 200 || err.status === 204) {
                  console.log('Statement successfully received by LRS');
  
                  // Add success class to the element with the given ID
                  var element = document.getElementById(elementId);
                  if (element) {
                      element.classList.add('success');
                  }
              } else {
                  console.log('There was an issue with the statement delivery to LRS');
              }
          }
      });
  }
  
    // load libraries from external CDNs because it's easier than 
    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js",
      function (data, textStatus, jqxhr) {
        console.log('crypto js file loaded');
      }
    );
  
    $.getScript("https://gmdoug.sfo3.cdn.digitaloceanspaces.com/xapiwrapper-1-11.js",
      function (data, textStatus, jqxhr) {
        console.log('xAPI wrapper file loaded');
      }
    );
  
    // set a cookie to randomize users and assign it to the acrot var
    var courseUser = "user" + Math.floor(Math.random() * 89999999 + 10000000);
    if (!("courseRandomUsername" in localStorage)) {
      localStorage.setItem("courseRandomUsername", courseUser);
    }
    var actor = localStorage.getItem("courseRandomUsername") || courseUser;
    var actorMbox = "mailto:" + actor + "@yourdomain.com"
  
    // ======================================
    // TEST CLICK BUTTON
    // ======================================
    
    window.send_testclick = function () {
      setupXAPIConfig();
  
      //define the xapi statement being sent
      var statement = {
        "actor": {
          "mbox": "mailto:doughahn@gmail.com",
          "name": actor,
          "objectType": "Agent"
        },
        "verb": {
          "id": "http://example.com/xapi/interacted",
          "display": { "en-US": "interacted" }
        },
        "object": {
          "id": "http://example.com/thank_you_example",
          "definition": {
            "name": { "en-US": "Button Click Test" },
            "description": { "en-US": "User Interacted with the Test Button." }
          },
          "objectType": "Activity"
        },
        "result": {
            "response": "User successfully clicked the test button."    
        }
      }; //end statement definition
  
      sendXAPIStatement(statement, 'testButton');
      console.log("clicked the button");
    };
    
    // ======================================
    // TEST SELECTED LINK
    // ======================================
    window.send_test_selected_link = function () {
      setupXAPIConfig();
      
      //define the xapi statement being sent
      var statement = {
        "actor": {
          "mbox": "mailto:doughahn@gmail.com",
          "name": actor,
          "objectType": "Agent"
        },
        "verb": {
          "id": "http://adlnet.gov/expapi/verbs/answered",
          "display": { "en-US": "answered" }
        },
        "object": {
            "id": "http://example.com/link_selection_example",
            "definition": {
                "name": {"en-US": "Link Selection Example"},
                "description": {"en-US": "The user selected an example link to move to the next passage"},
                "type": "http://example.com/multiple_choice_selection" 
            },
            "objectType": "Activity"
        },
        "result": {
            "response": "User chose: " + window.story.state.selectedTestLink
        }
      }; //end statement definition
  
      sendXAPIStatement(statement);
      console.log("User chose: " + window.story.state.selectedTestLink);
    };
    
    // ======================================
    // TEST INPUT AREA
    // ======================================

    // give twine access to the xAPI stuff regardless of scope
    window.send_test_inputArea = function () {
      setupXAPIConfig();
      
      //define the xapi statement being sent
      var statement = {
        "actor": {
          "mbox": "mailto:doughahn@gmail.com",
          "name": actor,
          "objectType": "Agent"
        },
        "verb": {
          "id": "http://adlnet.gov/expapi/verbs/answered",
          "display": { "en-US": "answered" }
        },
        "object": {
            "id": "https://example.com/courses/123/activities/textarea",
            "definition": {
                "name": {"en-US": "Textarea Sample"},
                "description": {"en-US": "Textarea Sample"},
                "type": "http://example.com/textarea" 
            },
            "objectType": "Activity"
        },
        "result": {
            "response": window.story.state.inputTestArea
        }
      }; //end statement definition
  
      sendXAPIStatement(statement);
      console.log("Input: " + window.story.state.inputTestArea);
    };
    
    // ======================================
    // TEST TEXT AREA
    // ======================================

    window.send_test_textarea = function () {
      setupXAPIConfig();
      
      //define the xapi statement being sent
      var statement = {
        "actor": {
          "mbox": "mailto:doughahn@gmail.com",
          "name": actor,
          "objectType": "Agent"
        },
        "verb": {
          "id": "http://adlnet.gov/expapi/verbs/answered",
          "display": { "en-US": "answered" }
        },
        "object": {
            "id": "https://example.com/courses/123/activities/textarea",
            "definition": {
                "name": {"en-US": "Textarea Sample"},
                "description": {"en-US": "Input Area Sample"},
                "type": "http://example.com/textarea" 
            },
            "objectType": "Activity"
        },
        "result": {
            "response": window.story.state.textTestArea
        }
      }; //end statement definition
  
      sendXAPIStatement(statement);
      console.log("Text Sent: " + window.story.state.textTestArea);
    };
    
    // ======================================
    // TEST MULTIPLE CHOICE
    // ======================================
    window.send_multiple_choice = function () {
      setupXAPIConfig();
  
      //define the xapi statement being sent
  
      const userChoice = document.querySelector('input[name="choice"]:checked').value;
      console.log("Sending xAPI statement for user choice:", userChoice);
      
      var statement = {
        "actor": {
          "mbox": "mailto:doughahn@gmail.com",
          "name": actor,
          "objectType": "Agent"
        },
        "verb": {
          "id": "http://adlnet.gov/expapi/verbs/answered",
          "display": { "en-US": "answered" }
        },
        "object": {
            "id": "http://example.com/button_example",
            "definition": {
                "name": {"en-US": "MC Example"},
                "description": {"en-US": "MC Example?"},
                "type": "http://example.com/multiple_choice_selection" 
            },
            "objectType": "Activity"
        },
        "result": {
            "response": userChoice
        }
      }; //end statement definition
  
      sendXAPIStatement(statement);
      console.log("Choice: " + userChoice);
    };
    
    // ======================================
    // TEST CHECKBOX
    // ======================================
    window.send_checkbox = function () {
      setupXAPIConfig();
  
      //define the xapi statement being sent
      
      var statement = {
        "actor": {
          "mbox": "mailto:doughahn@gmail.com",
          "name": actor,
          "objectType": "Agent"
        },
        "verb": {
          "id": "http://adlnet.gov/expapi/verbs/interacted",
          "display": { "en-US": "answered" }
        },
        "object": {
            "id": "http://example.com/checkbox",
            "definition": {
                "name": {"en-US": "Check or Unchecked Example"},
                "description": {"en-US": "Check or Unchecked Example"},
                "type": "http://example.com/multiple_choice_selection" 
            },
            "objectType": "Activity"
        },
        "result": {
            "response": window.story.state.checkbox
        }
      }; //end statement definition
  
      sendXAPIStatement(statement);
      console.log("Check Status: " + window.story.state.checkbox);
    };
  });
  