var login_button = document.getElementById("login-btn");
var username = ""
var welcome_message_text = document.getElementById("welcome-message");

function loadProfile() {
  velcome_message_text.innerHTML = "Welcome Back, " + username + "!";
  console.log("Profile Loaded");
}



function loginclicked() {
  window.location.href = "https://retrogamesnetwork.github.io/web/launch.html";
  username = document.getElementById("floatingInput").value;
}
