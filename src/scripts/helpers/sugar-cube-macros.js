// This file contains several utility functions used in the Twine game.

// Custom link handler function to navigate to a specified Twine passage.
window.customLinkHandler = function (passageName) {
  Engine.play(passageName);
};

// Custom button handler function to navigate to a specified Twine passage.
window.customButtonHandler = function (passageName) {
  Engine.play(passageName);
};

// Function to check if an option is selected in a form and enable or disable the submit button accordingly.
function checkOptionSelected(formId) {
  const formChoice = document.querySelector('input[name="' + formId + '-choice"]:checked');
  const submitButton = document.getElementById(formId + '-submit');

  // Enable the submit button if a form choice is selected, otherwise disable it.
  if (formChoice) {
      submitButton.removeAttribute('disabled');
  } else {
      submitButton.setAttribute('disabled', true);
  }
}

// Make the checkOptionSelected function globally accessible.
window.checkOptionSelected = checkOptionSelected;

// Function to set up clipboard copy functionality for elements with the .copyButton class.
window.setupClipboardCopy = function() {
  const copyButtons = document.querySelectorAll(".copyButton");

  // Add a click event listener to each copy button.
  copyButtons.forEach(button => {
      button.addEventListener("click", function() {
          const text = this.previousElementSibling.innerText;

          // Copy the text to the clipboard.
          navigator.clipboard.writeText(text)
              .then(() => {
                  console.log("Text copied to clipboard");

                  // Show a temporary "Copied" message and style the button as copied.
                  const copiedMessage = this.nextElementSibling;
                  setTimeout(() => {
                      copiedMessage.classList.remove("show");
                  }, 1000);
                  this.innerText = "Copied";
                  this.classList.add("copied");
              })
              .catch(err => {
                  console.error("Error copying text: ", err);
              });
      });
  });
}

// Function to update the visit count display for a given element ID and passage name.
window.updateVisitCount = function(elementId, passageName) {
  var visitCount = passageName ? visited(passageName) : visited();
  var targetElement = document.getElementById(elementId);

  // Update the target element's text content with the visit count.
  if (targetElement) {
      targetElement.textContent = visitCount;
  } else {
      console.warn('Element with ID "' + elementId + '" not found.');
  }
};
