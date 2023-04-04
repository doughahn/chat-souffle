function getContextWithExperienceLevel() {
    const selectedCategoryGroup = localStorage.getItem("selectedCategoryGroup");
  
    return {
      "contextActivities": {
        "category": [
          {
            "id": "https://doughahn.github.io/chat-souffle/categories/experience/" + encodeURIComponent(selectedCategoryGroup),
            "objectType": "Activity",
            "definition": {
              "name": {
                "en-US": selectedCategoryGroup 
              },
              "description": {
                "en-US": "A category for actors with a " + selectedCategoryGroup 
              }
            }
          }
        ]
      }
    };
  } 

  