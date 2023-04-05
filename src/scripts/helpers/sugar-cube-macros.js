window.customLinkHandler = function (passageName) {
  Engine.play(passageName);
};

window.customButtonHandler = function (passageName) {
  Engine.play(passageName);
};

function checkOptionSelected(formId) {
  const formChoice = document.querySelector('input[name="' + formId + '-choice"]:checked');
  const submitButton = document.getElementById(formId + '-submit');

  if (formChoice) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', true);
  }
}

window.checkOptionSelected = checkOptionSelected;


// copy test

window.setupClipboardCopy = function() {
  // function body
  const copyButtons = document.querySelectorAll(".copyButton");

  copyButtons.forEach(button => {
      button.addEventListener("click", function() {
          const text = this.previousElementSibling.innerText;
          navigator.clipboard.writeText(text)
              .then(() => {
                  console.log("Text copied to clipboard");
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