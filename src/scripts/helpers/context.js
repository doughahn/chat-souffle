// This function returns an xAPI context object with a category based on the selected category group. The function's name should be more generic. It's a to-do.

function getContextWithExperienceLevel() {
  // Retrieve the selected category group from the local storage.
  const selectedCategoryGroup = localStorage.getItem("selectedCategoryGroup");

  // Return an xAPI context object with the appropriate category.
  return {
      "contextActivities": {
          "category": [
              {
                  // Construct the category ID using the base URL and the encoded selected category group.
                  "id": "https://doughahn.github.io/chat-souffle/categories/experience/" + encodeURIComponent(selectedCategoryGroup),
                  "objectType": "Activity",
                  "definition": {
                      "name": {
                          // Set the category name to the selected category group.
                          "en-US": selectedCategoryGroup
                      },
                      "description": {
                          // Set the category description to describe the selected category group.
                          "en-US": "A category for actors with a " + selectedCategoryGroup
                      }
                  }
              }
          ]
      }
  };
}
