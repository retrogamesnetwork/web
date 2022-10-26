function json(url) {
  return fetch(url).then(res => res.json());
}

function login() {
  var username_field = document.getElementById("username_field");
  var password_field = document.getElementById("password_field");
  
  
let apiKey = '7d2f25dc8ceb1b67d9357a0825d02d41046378a6184421a2f4ccd178';
json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
  localStorage.setItem("IP", data.ip);
  localStorage.setItem("username", username_field.value);
  localStorage.setItem("password", password_field.value);
}


function getData() {
  var username = localStorage.getItem("username");
  var password = localStorage.getItem("password");
}
