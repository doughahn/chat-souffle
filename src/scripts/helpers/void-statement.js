function sendVoidStatement(actorEmail, actorName, originalStatementId, callback) {
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

  ADL.XAPIWrapper.sendStatement(voidStatement, function (err, xhr) {
    if (callback) {
      callback(err, xhr);
    }
  });
}