// set a cookie to randomize users and assign it to the actor var
var courseUser = "user" + Math.floor(Math.random() * 89999999 + 10000000);
if (!("courseUserName" in localStorage)) {
    localStorage.setItem("courseUserName", courseUser);
}
var actor = localStorage.getItem("courseUserName") || courseUser;
var actorMbox = "mailto:" + actor + "@doughahn.github.io"