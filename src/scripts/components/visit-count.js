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