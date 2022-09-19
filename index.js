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

const db = firebase.database();

const chat_username = prompt("Enter a Username for the chatroom");

document.getElementById("message-form").addEventListener("submit", sendMessage);

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
    chat_username,
    message,
  });
}

const fetchChat = db.ref("messages/");
