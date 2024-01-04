// init.js
var firebaseConfig = {
  // Tus configuraciones de Firebase
};
firebase.initializeApp({
    apiKey: "AIzaSyDEAeDnzM_IHgpET0SfaD4Q67HMqEt0w5o",
    authDomain: "registros-55f14.firebaseapp.com",
    projectId: "registros-55f14",
    storageBucket: "registros-55f14.appspot.com",
    messagingSenderId: "263451239281",
    appId: "1:263451239281:web:5243fb12da684252e40cd0",
    measurementId: "G-LG6SY3S5CF"
  });

var providerGoogle = new firebase.auth.GoogleAuthProvider();
var providerTwitter = new firebase.auth.TwitterAuthProvider();

function signInWithGoogle() {
  firebase.auth().signInWithPopup(providerGoogle);
}

function signInWithTwitter() {
  firebase.auth().signInWithPopup(providerTwitter);
}
