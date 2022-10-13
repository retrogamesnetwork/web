function showLogin() {
  window.href("#setupChat1")
}

window.onload = showLogin;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCYgieNluU4atVEYhCcUY5GC78eqYXBYsA",
  authDomain: "retro-games-network.firebaseapp.com",
  databaseURL: "https://retro-games-network-default-rtdb.firebaseio.com",
  projectId: "retro-games-network",
  storageBucket: "retro-games-network.appspot.com",
  messagingSenderId: "1025542945363",
  appId: "1:1025542945363:web:c4d81a05a8a9d8809564a6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("Please enter your username");
const profile_picture_url = prompt("(OPTIONAL) PROFILE PICTURE URL. IF YOU DO NOT WANT TO ADD A PROFILE PICTURE JUST CLICK CANCEL. PROFILE PICTURE URLS MUST BE VALID IMAGE URLS AND BE APPROPRATE");
if (profile_picture_url = "") {
  profile_picture_url = "https://retrogamesnetwork.github.io/web/account/guest.png"
};

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
    profile_picture_url,
  });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span><strong style="font-size:large;"><img src=${messages.profile_picture_url} style="border:none;border-radius:100px;" width="30px"><span>  </span>${messages.username}<br></strong></span>${messages.message}</li><br>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
