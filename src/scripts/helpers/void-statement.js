// This function sends a voiding xAPI statement to the LRS to void a previous statement.
// It takes an actor's email, name, the original statement ID to be voided, and an optional callback function.
function sendVoidStatement(actorEmail, actorName, originalStatementId, callback) {
  // Create the voiding statement with the provided actor information and the original statement ID.
  var voidStatement = {
      "actor": {
          "mbox": "mailto:" + actorEmail,
          "name": actorName,
          "objectType": "Agent"
      },
      "verb": {
          "id": "http://adlnet.gov/expapi/verbs/voided",
          "display": { "en-US": "voided" }
      },
      "object": {
          "id": originalStatementId,
          "objectType": "StatementRef"
      }
  };

  // Send the voiding statement using the xAPI wrapper.
  ADL.XAPIWrapper.sendStatement(voidStatement, function (err, xhr) {
      // If a callback function is provided, call it with the error and XMLHttpRequest object.
      if (callback) {
          callback(err, xhr);
      }
  });
}
