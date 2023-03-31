// context obj

function getContextWithExperienceLevel() {
  const selectedExperienceLevel = localStorage.getItem("selectedExperienceLevel");

  return {
    "contextActivities": {
      "category": [
        {
          "id": "https://doughahn.github.io/chat-souffle/categories/experience/" + encodeURIComponent(selectedExperienceLevel),
          "objectType": "Activity",
          "definition": {
            "name": {
              "en-US": selectedExperienceLevel + " Experience Level"
            },
            "description": {
              "en-US": "A category for actors with a " + selectedExperienceLevel + " experience level in multiple choice assessment."
            }
          }
        }
      ]
    }
  };
}



// ======================================
// VOID Vars on LOAD
// ======================================
// not all statements need these. Surveys do.

window.send_testclick = function () {
  setupXAPIConfig();

  var actorEmail = "doughahn@gmail.com";
  var actorName = "your_actor_random_name"; // Replace with the actual random name of the Actor

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
      "display": { "en-US": "interacted" }
    },
    "object": {
      "id": "https://doughahn.github.io/chat-souffle/send_testclick",
      "definition": {
        "name": { "en-US": "Button Click Test" },
        "description": { "en-US": "User Interacted with the Test Button." },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": "User successfully clicked the test button."
    },
    "context": getContextWithExperienceLevel() // Include the context with the category
  };

  var newStatementId = sendXAPIStatement(statement, 'testButton');
  if (newStatementId) {
    // Store the new statement ID in localStorage
    localStorage.setItem("lastTestButtonClickStatementId", newStatementId);
  }
};


// ======================================
// SELF ASSESSMENT OF MULTIPLE CHOICE 1
// ======================================

var void_test_button_send_survey_1_statementID = null;

window.send_survey_1 = function () {
  setupXAPIConfig();

  var actorEmail = "doughahn@gmail.com";
  var actorName = "your_actor_random_name"; // Replace with the actual random name of the Actor

  // Retrieve the last statement ID from localStorage
  var lastStatementId = localStorage.getItem("lastStatementId");
  
  if (lastStatementId) {
    sendVoidStatement(actorEmail, actorName, lastStatementId, function (err, xhr) {
      if (err && err.status !== 200 && err.status !== 204) {
        console.log('xAPI void statement send error:', err);
      } else {
        console.log('xAPI void statement sent, response:', err.status);
      }
    });
  }


  // query the input name and store it as a const for retrieval
  const survey1Choice = document.querySelector('input[name="survey-1-choice"]:checked').value;

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
      "id": "https://doughahn.github.io/chat-souffle/send_survey_1",
      "definition": {
        "name": { "en-US": "Experience Self-Assessment" },
        "description": { "en-US": "The user's self-assessment of experience in multiple choice assessment" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": survey1Choice
    },
    "context": {
      "contextActivities": {
        "grouping": [
          {
            "id": "https://doughahn.github.io/chat-souffle/groups/" + survey1Choice,
            "objectType": "Activity",
            "definition": {
              "name": {
                "en-US": survey1Choice + " Group"
              },
              "description": {
                "en-US": "A group for actors with a " + survey1Choice + " experience level in multiple choice assessment."
              }
            }
          }
        ]
      }
    }
  };
  localStorage.setItem("selectedExperienceLevel", survey1Choice);
  var newStatementId = sendXAPIStatement(statement, 'survey-1-submit');
  if (newStatementId) {
    // Store the new statement ID in localStorage
    localStorage.setItem("lastStatementId", newStatementId);
  }
};



// ======================================
// SELF ASSESSMENT OF MULTIPLE CHOICE 3
// ======================================
window.send_survey_3 = function () {
  setupXAPIConfig();

  // query the input name and store it as a const for retrieval
  const mcSelfAssessChoice = document.querySelector('input[name="survey-3-choice"]:checked').value;

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
      "id": "https://doughahn.github.io/chat-souffle/send_survey_3",
      "definition": {
        "name": { "en-US": "Multiple Choice Design Self-Assessment" },
        "description": { "en-US": "The USer's Self-Assessment of Mltiple Choice Quesiton Design" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": mcSelfAssessChoice
    }
  };

  sendXAPIStatement(statement, 'survey-3-submit');
};

// ======================================
// Provided Assessment Track 1 Likert
// ======================================
window.send_provided_assessment_track1_likert = function () {
  setupXAPIConfig();

  // query the input name and store it as a const for retrieval
  const mcSelfAssessChoice = document.querySelector('input[name="provided-assessment-track-1-likert-choice"]:checked').value;

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
      "id": "https://doughahn.github.io/chat-souffle/send_provided_assessment_track1_likert",
      "definition": {
        "name": { "en-US": "Multiple Choice Design Self-Assessment" },
        "description": { "en-US": "The USer's Self-Assessment of Mltiple Choice Quesiton Design" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": mcSelfAssessChoice
    }
  };

  sendXAPIStatement(statement, 'provided-assessment-track-1-submit');
};

// ======================================
// Provided Assessment Track 1 Text area
// ======================================

window.send_track_1_1_textarea = function () {
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
      "id": "https://doughahn.github.io/chat-souffle/send_track_1_1_textarea",
      "definition": {
        "name": { "en-US": "Textarea Sample" },
        "description": { "en-US": "Input Area Sample" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": window.story.state.provided_assessment_track_1_textarea
    }
  };

  sendXAPIStatement(statement, 'provided-assessment-track-1-textarea-confirm');
};

// ======================================
// Provided Assessment Track 2 Likert
// ======================================
window.send_provided_assessment_track2_likert = function () {
  setupXAPIConfig();

  // query the input name and store it as a const for retrieval
  const mcSelfAssessChoice = document.querySelector('input[name="provided-assessment-track-2-likert-choice"]:checked').value;

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
      "id": "https://doughahn.github.io/chat-souffle/send_provided_assessment_track2_likert",
      "definition": {
        "name": { "en-US": "Multiple Choice Design Self-Assessment" },
        "description": { "en-US": "The USer's Self-Assessment of Mltiple Choice Quesiton Design" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": mcSelfAssessChoice
    }
  };

  sendXAPIStatement(statement, 'provided-assessment-track-2-submit');
};

// ======================================
// Provided Assessment Track 2 Text area
// ======================================

window.send_track_1_2_textarea = function () {
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
      "id": "https://doughahn.github.io/chat-souffle/send_track_1_2_textarea",
      "definition": {
        "name": { "en-US": "Textarea Sample" },
        "description": { "en-US": "Input Area Sample" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": window.story.state.provided_assessment_track_2_textarea
    }
  };

  sendXAPIStatement(statement, 'provided-assessment-track-2-textarea-confirm');
};

// ======================================
// Provided Assessment Track 3 Likert
// ======================================
window.send_provided_assessment_track3_likert = function () {
  setupXAPIConfig();

  // query the input name and store it as a const for retrieval
  const mcSelfAssessChoice = document.querySelector('input[name="provided-assessment-track-3-likert-choice"]:checked').value;

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
      "id": "https://doughahn.github.io/chat-souffle/send_provided_assessment_track3_likert",
      "definition": {
        "name": { "en-US": "Multiple Choice Design Self-Assessment" },
        "description": { "en-US": "The USer's Self-Assessment of Mltiple Choice Quesiton Design" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": mcSelfAssessChoice
    }
  };

  sendXAPIStatement(statement, 'provided-assessment-track-3-submit');
};

// ======================================
// Provided Assessment Track 3 Text area
// ======================================

window.send_track_1_3_textarea = function () {
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
      "id": "https://doughahn.github.io/chat-souffle/send_track_1_3_textarea",
      "definition": {
        "name": { "en-US": "Textarea Sample" },
        "description": { "en-US": "Input Area Sample" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": window.story.state.provided_assessment_track_3_textarea
    }
  };

  sendXAPIStatement(statement, 'provided-assessment-track-3-textarea-confirm');
};

// ======================================
// Provided Assessment Track 4 Likert
// ======================================
window.send_provided_assessment_track4_likert = function () {
  setupXAPIConfig();

  // query the input name and store it as a const for retrieval
  const mcSelfAssessChoice = document.querySelector('input[name="provided-assessment-track-4-likert-choice"]:checked').value;

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
      "id": "https://doughahn.github.io/chat-souffle/send_provided_assessment_track4_likert",
      "definition": {
        "name": { "en-US": "Multiple Choice Design Self-Assessment" },
        "description": { "en-US": "The USer's Self-Assessment of Mltiple Choice Quesiton Design" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": mcSelfAssessChoice
    }
  };

  sendXAPIStatement(statement, 'provided-assessment-track-4-submit');
};

// ======================================
// Provided Assessment Track 4 Text area
// ======================================

window.send_track_1_4_textarea = function () {
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
      "id": "https://doughahn.github.io/chat-souffle/send_track_1_4_textarea",
      "definition": {
        "name": { "en-US": "Textarea Sample" },
        "description": { "en-US": "Input Area Sample" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": window.story.state.provided_assessment_track_4_textarea
    }
  };

  sendXAPIStatement(statement, 'provided-assessment-track-4-textarea-confirm');
};

// ======================================
// Self Assessment Track 1 Likert
// ======================================
window.send_self_assessment_track1_likert = function () {
  setupXAPIConfig();

  // query the input name and store it as a const for retrieval
  const mcSelfAssessChoice = document.querySelector('input[name="self-assessment-track-1-likert-choice"]:checked').value;

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
      "id": "https://doughahn.github.io/chat-souffle/send_self_assessment_track1_likert",
      "definition": {
        "name": { "en-US": "Multiple Choice Design Self-Assessment" },
        "description": { "en-US": "The USer's Self-Assessment of Mltiple Choice Quesiton Design" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": mcSelfAssessChoice
    }
  };

  sendXAPIStatement(statement, 'self-assessment-track-1-submit');
};

// ======================================
// self Assessment Track Question Text area
// ======================================

window.send_track_1_1_textarea = function () {
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
      "id": "https://doughahn.github.io/chat-souffle/send_track_1_1_textarea",
      "definition": {
        "name": { "en-US": "Textarea Sample" },
        "description": { "en-US": "Input Area Sample" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": window.story.state.self_assessment_track_1_textarea
    }
  };

  sendXAPIStatement(statement, 'self-assessment-track-1-textarea-confirm');
};

// ======================================
// Self Generated Track Likert
// ======================================
window.send_self_assessment_track2_likert = function () {
  setupXAPIConfig();

  // query the input name and store it as a const for retrieval
  const mcSelfAssessChoice = document.querySelector('input[name="self-assessment-track-2-likert-choice"]:checked').value;

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
      "id": "https://doughahn.github.io/chat-souffle/send_self_assessment_track2_likert",
      "definition": {
        "name": { "en-US": "Multiple Choice Design Self-Assessment" },
        "description": { "en-US": "The USer's Self-Assessment of Mltiple Choice Quesiton Design" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": mcSelfAssessChoice
    }
  };

  sendXAPIStatement(statement, 'self-assessment-track-2-submit');
};

// ======================================
// self Assessment Track 2 Text area
// ======================================

window.send_track_1_2_textarea = function () {
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
      "id": "https://doughahn.github.io/chat-souffle/send_track_1_2_textarea",
      "definition": {
        "name": { "en-US": "Textarea Sample" },
        "description": { "en-US": "Input Area Sample" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": window.story.state.self_assessment_track_2_textarea
    }
  };

  sendXAPIStatement(statement, 'self-assessment-track-2-textarea-confirm');
};

// ======================================
// self Assessment Track 2 Text area
// ======================================

window.send_self_assess_track_1_2_textarea = function () {
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
      "id": "https://doughahn.github.io/chat-souffle/send_track_1_2_textarea",
      "definition": {
        "name": { "en-US": "Textarea Sample" },
        "description": { "en-US": "Input Area Sample" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": window.story.state.self_assessment_track_2_textarea
    }
  };

  sendXAPIStatement(statement, 'self-assessment-track-1-textarea2-confirm');
};

// ======================================
// self Assessment Track 3 Likert
// ======================================
window.send_self_assessment_track3_likert = function () {
  setupXAPIConfig();

  // query the input name and store it as a const for retrieval
  const mcSelfAssessChoice = document.querySelector('input[name="self-assessment-track-3-likert-choice"]:checked').value;

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
      "id": "https://doughahn.github.io/chat-souffle/send_self_assessment_track3_likert",
      "definition": {
        "name": { "en-US": "Multiple Choice Design Self-Assessment" },
        "description": { "en-US": "The USer's Self-Assessment of Mltiple Choice Quesiton Design" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": mcSelfAssessChoice
    }
  };

  sendXAPIStatement(statement, 'self-assessment-track-3-submit');
};

// ======================================
// self Assessment Track 3 Text area
// ======================================

window.send_track_1_3_textarea = function () {
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
      "id": "https://doughahn.github.io/chat-souffle/send_track_1_3_textarea",
      "definition": {
        "name": { "en-US": "Textarea Sample" },
        "description": { "en-US": "Input Area Sample" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": window.story.state.self_assessment_track_3_textarea
    }
  };

  sendXAPIStatement(statement, 'self-assessment-track-3-textarea-confirm');
};

// ======================================
// self Assessment Track 4 Likert
// ======================================
window.send_self_assessment_track4_likert = function () {
  setupXAPIConfig();

  // query the input name and store it as a const for retrieval
  const mcSelfAssessChoice = document.querySelector('input[name="self-assessment-track-4-likert-choice"]:checked').value;

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
      "id": "https://doughahn.github.io/chat-souffle/send_self_assessment_track4_likert",
      "definition": {
        "name": { "en-US": "Multiple Choice Design Self-Assessment" },
        "description": { "en-US": "The USer's Self-Assessment of Mltiple Choice Quesiton Design" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": mcSelfAssessChoice
    }
  };

  sendXAPIStatement(statement, 'self-assessment-track-4-submit');
};

// ======================================
// self Assessment Track 4 Text area
// ======================================

window.send_track_1_4_textarea = function () {
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
      "id": "https://doughahn.github.io/chat-souffle/send_track_1_4_textarea",
      "definition": {
        "name": { "en-US": "Textarea Sample" },
        "description": { "en-US": "Input Area Sample" },
      },
      "objectType": "Activity"
    },
    "result": {
      "response": window.story.state.self_assessment_track_4_textarea
    }
  };

  sendXAPIStatement(statement, 'self-assessment-track-4-textarea-confirm');
};