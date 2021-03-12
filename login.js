var user;
var signedUp = false;


function submitRegister(){
    console.log("firebase");
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    console.log(email + " " + password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    user = userCredential.user;
    signedUp = true;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });
}

function submit(){
    var email = document.getElementById("email2").value;
    var password = document.getElementById("password2").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    console.log(uid);
    if(signedUp){
        var name = document.getElementById("name").value;
        var preferences = document.getElementById("preferences").value;
      
        writeUserData(uid, name, preferences);
        
    }
    // ...
  } else {
    // User is signed out
    // ...
    console.log("ok");
  }
});

function logOut(){
    firebase.auth().signOut().then(() => {
  // Sign-out successful.
  
    }).catch((error) => {
  // An error happened.
    });
}

function writeUserData(userId, name, preferences) {
  firebase.database().ref('users/' + userId).set({
    name: name,
    preferences: preferences
  });
}
