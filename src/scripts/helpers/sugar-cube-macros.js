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
