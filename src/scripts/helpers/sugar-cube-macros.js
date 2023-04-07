// This file contains several utility functions used in the Twine game.


$(document).on(':passagerender', function (event, eventData) {
  var warningBannerText = "Using Dev LRS";
  var usingDevEnv = State.variables.devConf;
  var usingProdEnv = State.variables.prodConf;

  if (usingDevEnv && !usingProdEnv) {
    var warningBanner = document.createElement('div');
    warningBanner.innerHTML = warningBannerText;
    warningBanner.style.backgroundColor = 'red';
    warningBanner.style.color = 'white';
    warningBanner.style.fontWeight = 'bold';
    warningBanner.style.padding = '5px';
    warningBanner.style.position = 'fixed';
    warningBanner.style.top = '0';
    warningBanner.style.left = '0';
    warningBanner.style.width = '100%';
    warningBanner.style.zIndex = '1000';

    eventData.content.appendChild(warningBanner);
  }
});


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


// JSON and typing

document.addEventListener("DOMContentLoaded", function() {
  const jsonExample = {
      "name": "John",
      "age": 30,
      "city": "New York",
      "isStudent": false
  };

  const typingSpeed = 35; // Adjust this value to control typing speed.

  const jsonContainer = document.getElementById("json-container");
  let jsonStr = JSON.stringify(jsonExample, null, 2);

  function typeJSON(jsonString, index = 0) {
      if (index < jsonString.length) {
          let char = jsonString[index];
          let span = document.createElement("span");

          if (char === '"') {
              const keyMatch = jsonString.substring(index).match(/^"([^"]+)":/);
              if (keyMatch) {
                  span.classList.add("json-key");
                  char = keyMatch[0];
                  index += keyMatch[0].length - 1;
              } else {
                  span.classList.add("json-string");
                  const strMatch = jsonString.substring(index).match(/"((?:[^"\\]|\\.)*)"/);
                  if (strMatch) {
                      char = strMatch[0];
                      index += strMatch[0].length - 1;
                  }
              }
          } else if (char.match(/\d/)) {
              span.classList.add("json-number");
              const numMatch = jsonString.substring(index).match(/-?\d+(\.\d+)?([eE][+-]?\d+)?/);
              if (numMatch) {
                  char = numMatch[0];
                  index += numMatch[0].length - 1;
              }
          } else if (char.match(/true|false|null/)) {
              span.classList.add("json-boolean");
              const boolMatch = jsonString.substring(index).match(/true|false|null/);
              if (boolMatch) {
                  char = boolMatch[0];
                  index += boolMatch[0].length - 1;
              }
          }

          span.textContent = char;
          jsonContainer.appendChild(span);
          setTimeout(() => typeJSON(jsonString, index + 1), typingSpeed);
      }
  }

  typeJSON(jsonStr);
});
