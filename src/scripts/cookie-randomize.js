// set a cookie to randomize users and assign it to the actor var
var courseUser = "user" + Math.floor(Math.random() * 89999999 + 10000000);
if (!("courseRandomUsername" in localStorage)) {
    localStorage.setItem("courseRandomUsername", courseUser);
}
var actor = localStorage.getItem("courseRandomUsername") || courseUser;
var actorMbox = "mailto:" + actor + "@yourdomain.com"