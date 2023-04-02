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