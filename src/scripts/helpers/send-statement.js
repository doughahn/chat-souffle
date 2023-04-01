function sendXAPIStatement(statement, elementId) {
    ADL.XAPIWrapper.sendStatement(statement, function (err, xhr) {
        if (err && err.status !== 200 && err.status !== 204) {
            console.log('xAPI statement send error:', err);
        } else {
            console.log('xAPI statement sent, response:', err.status);
            if (err.status === 200 || err.status === 204) {
                console.log('Statement successfully received by LRS');

                // Add success class to the element with the given ID
                var element = document.getElementById(elementId);
                if (element) {
                    element.classList.add('success');
                }
            } else {
                console.log('There was an issue with the statement delivery to LRS');
            }
        }
    });
    console.log(statement);
    return statement.id; 
}