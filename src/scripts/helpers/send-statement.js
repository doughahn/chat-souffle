// This function sends an xAPI statement to the configured LRS and logs the result.
// Optionally, it can update a DOM element's class list with a success class on successful statement delivery.
function sendXAPIStatement(statement, elementId) {
    // Use the xAPI wrapper to send the statement.
    ADL.XAPIWrapper.sendStatement(statement, function (err, xhr) {
        // Check for errors and log them.
        if (err && err.status !== 200 && err.status !== 204) {
            console.log('xAPI statement send error:', err);
        } else {
            // Log the HTTP status code of the response.
            console.log('xAPI statement sent, response:', err.status);

            // Check for successful status codes (200 or 204) and log the success message.
            if (err.status === 200 || err.status === 204) {
                console.log('Statement successfully received by LRS');

                // Add the 'success' class to the DOM element with the given ID, if it exists.
                var element = document.getElementById(elementId);
                if (element) {
                    element.classList.add('success');
                }
            } else {
                // Log the issue with statement delivery.
                console.log('There was an issue with the statement delivery to LRS');
            }
        }
    });

    // Log the xAPI statement as a formatted JSON string.
    console.log(JSON.stringify(statement, null, '\t'));

    // Return the statement's ID.
    return statement.id;
}
