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
const username = prompt("Welcome to the Retro Games Network Public Chatroom, Please enter a username to continue")

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
  db.ref("channel-31231238482/" + timestamp).set({
    username,
    message,
  });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("channel-31231238482/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span><strong>${messages.username}: </strong></span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
