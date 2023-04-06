// This script sets a random user ID to a cookie and assigns it to the 'actor' variable.
// The purpose is to randomize users for the xAPI-enabled Twine game.

// Generate a random user ID string by concatenating 'user' with a random number between 10000000 and 99999999.
var courseUser = "user" + Math.floor(Math.random() * 89999999 + 10000000);

// If 'courseUserName' is not present in local storage, set it with the generated 'courseUser' value.
if (!("courseUserName" in localStorage)) {
    localStorage.setItem("courseUserName", courseUser);
}

// Retrieve 'courseUserName' from local storage, or use the generated 'courseUser' value if not available.
var actor = localStorage.getItem("courseUserName") || courseUser;

// Construct the actor's email address by appending the 'actor' value to the base email domain.
var actorMbox = "mailto:" + actor + "@doughahn.github.io"
