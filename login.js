var user;
var signedUp = false;


function submitRegister(){
  
    var email = document.getElementById("email").value; // not done
    var password = document.getElementById("pwd").value; // not done
    
    console.log(`Email: ${email}\nPassword: ${password}`);
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
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
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
        var firstName = document.getElementById("fname").value;
        var lastName = document.getElementById("lname").value;
        var vegetables = document.getElementById("vegetables").value;
        var meat = document.getElementById("meat").value;
        var dairy = document.getElementById("dairy").value;
        writeUserData(uid, firstName, lastName, vegetables, meat, dairy);
        
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

function writeUserData(userId, firstName, lastName, vegetables, meat, dairy) {
  firebase.database().ref('users/' + userId).set({
    firstName: firstName,
    lastName: lastName,
    vegetables: vegetables,
    meat: meat,
    dairy: dairy
  });
}
