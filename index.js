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
const rules = alert("Please abide by the Terms of Service and other rules while using the chatroom");alert("Spamming or any lag or server breaking exploits are not allowed and can get your account terminated");alert("Innaproprate, sexual, racist, or any types of hate comments or materials are not allowed to be send in the chat");alert("Please note that if an admin or mod finds you doing these things, your account will be terminated");alert("Thank you for abiding by the Terms of Service and Rules, have a wonderful time with the Retro Games Network chatroom.");
const username = prompt("Please enter your username");
const profile_picture_url = prompt("Please paste the URL or Image Address for your profile picture. Innaproprate decals will be removed along with an account suspension");
const full_name = prompt("For security reasons, please provide us with your full name (This data will not be shared)");

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
    full_name,
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
