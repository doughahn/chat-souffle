// ======================================
// TEST BUTTON INTERACTION
// ======================================

window.send_testclick = function () {
  setupXAPIConfig();

  var statement = {
    "actor": {
      "mbox": "mailto:doughahn@gmail.com",
      "name": actor,
      "objectType": "Agent"
    },
    "verb": {
      "id": "http://adlnet.gov/expapi/verbs/interacted",
      "display": { "en-US": "interacted" }
    },
    "object": {
      "id": "https://doughahn.github.io/chat-souffle/send_testclick",
      "definition": {
        "name": { "en-US": "Button Click Test" },
        "description": { "en-US": "User Interacted with the Test Button." }
      },
      "objectType": "Activity"
    },
    "result": {
      "response": "User successfully clicked the test button."
    }
  };

  sendXAPIStatement(statement, 'testButton');
};

// ======================================
// TEST SELECTED LINK
// ======================================
window.send_test_selected_link = function () {
  setupXAPIConfig();

  var statement = {
    "actor": {
      "mbox": "mailto:doughahn@gmail.com",
      "name": actor,
      "objectType": "Agent"
    },
    "verb": {
      "id": "http://adlnet.gov/expapi/verbs/preferred",
      "display": { "en-US": "answered" }
    },
    "object": {
      "id": "https://doughahn.github.io/chat-souffle/send_test_selected_link",
      "definition": {
        "name": { "en-US": "Link Preference Example" },
        "description": { "en-US": "The user selected a preferred next passage" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": "User chose: " + window.story.state.selectedTestLink
    }
  };

  sendXAPIStatement(statement);
};

// ======================================
// TEST INPUT AREA
// ======================================

// give twine access to the xAPI stuff regardless of scope
window.send_test_inputArea = function () {
  setupXAPIConfig();

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
      "id": "https://doughahn.github.io/chat-souffle/send_test_inputArea",
      "definition": {
        "name": { "en-US": "Input Sample" },
        "description": { "en-US": "Input Sample" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": window.story.state.inputTestArea
    }
  };

  sendXAPIStatement(statement);
};

// ======================================
// TEST TEXT AREA
// ======================================

window.send_test_textarea = function () {
  setupXAPIConfig();

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
      "id": "https://doughahn.github.io/chat-souffle/send_test_textarea",
      "definition": {
        "name": { "en-US": "Textarea Sample" },
        "description": { "en-US": "Input Area Sample" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": window.story.state.textTestArea
    }
  };

  sendXAPIStatement(statement);
};

// ======================================
// TEST MULTIPLE CHOICE
// ======================================
window.send_multiple_choice = function () {
  setupXAPIConfig();

  const userChoice = document.querySelector('input[name="choice"]:checked').value;

  var statement = {
    "actor": {
      "mbox": "mailto:doughahn@gmail.com",
      "name": actor,
      "objectType": "Agent"
    },
    "verb": {
      "id": "https://w3id.org/xapi/dod-isd/verbs/chose",
      "display": { "en-US": "answered" }
    },
    "object": {
      "id": "https://doughahn.github.io/chat-souffle/send_multiple_choice",
      "definition": {
        "name": { "en-US": "Multiple Choice Example" },
        "description": { "en-US": "MC Example Choice" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": userChoice
    }
  };

  sendXAPIStatement(statement);
};

// ======================================
// TEST CHECKBOX
// ======================================
window.send_checkbox = function () {
  setupXAPIConfig();

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
      "id": "https://doughahn.github.io/chat-souffle/send_checkbox",
      "definition": {
        "name": { "en-US": "Check or Unchecked Example" },
        "description": { "en-US": "Check or Unchecked Example" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": window.story.state.checkbox
    }
  };

  sendXAPIStatement(statement);
};