// init.js
var firebaseConfig = {
  // Tus configuraciones de Firebase
};
firebase.initializeApp(firebaseConfig);

var providerGoogle = new firebase.auth.GoogleAuthProvider();
var providerTwitter = new firebase.auth.TwitterAuthProvider();

function signInWithGoogle() {
  firebase.auth().signInWithPopup(providerGoogle);
}

function signInWithTwitter() {
  firebase.auth().signInWithPopup(providerTwitter);
}
