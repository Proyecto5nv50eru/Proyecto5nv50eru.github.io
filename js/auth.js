/*  Initializa Firebase con la configuración del proyecto. Revisa la
 * configuración en tu servidor de Firebase.  */
// @ts-ignore
firebase.initializeApp({
  apiKey: "AIzaSyC218U2CzU4D0Tc_tkPC32e1pTolEr7NF4",
  authDomain: "proyecto-final-c77b2.firebaseapp.com",
  projectId: "proyecto-final-c77b2",
  storageBucket: "proyecto-final-c77b2.appspot.com",
  messagingSenderId: "845154975981",
  appId: "1:845154975981:web:73a05fd94885efe44a8ce4",
  measurementId: "G-NS9F6MNG39"
});

/** Conexión al sistema de autenticación de Firebase. */
// @ts-ignore
const auth = firebase.auth();
/** Tipo de autenticación de usuarios. En este caso es con Google. */
// @ts-ignore
const provider = new firebase.auth.GoogleAuthProvider();
/* Configura el proveedor de Google para que permita seleccionar de una
 * lista. */
provider.setCustomParameters({ prompt: "select_account" });

/** Tipo de autenticación de usuarios. En este caso es con Twitter. */
// @ts-ignore
const providerTwitter = new firebase.auth.TwitterAuthProvider();

/* Recibe una función que se invoca cada que hay un cambio en la
 * autenticación y recibe el modelo con las características del usuario.*/
auth.onAuthStateChanged(
  /** Recibe las características del usuario o null si no ha iniciado
   * sesión. */
  usuarioAuth => {
    if (usuarioAuth && usuarioAuth.email) {
      // Usuario aceptado.
      // @ts-ignore Muestra el email registrado en Google.
      email.value = usuarioAuth.email;
      // @ts-ignore Muestra el nombre registrado en Google.
      nombre.value = usuarioAuth.displayName;
      // @ts-ignore Muestra el avatar registrado en Google.
      avatar.src = usuarioAuth.photoURL;
      // Vincula la cuenta de Twitter con la de Google.
      auth.currentUser.linkWithRedirect(providerTwitter);
    } else {
      // No ha iniciado sesión. Pide datos para iniciar sesión.
      auth.signInWithRedirect(provider);
    }
  },
  // Función que se invoca si hay un error al verificar el usuario.
  procesaError
);

auth.getRedirectResult().then((result) => {
  if (result.credential) {
    // Esta da acceso al token de acceso de Twitter.
    var token = result.credential.accessToken;
    // La información del usuario de Twitter se puede recuperar con result.additionalUserInfo.username
    // @ts-ignore Muestra el nombre de usuario de Twitter.
    twitter.value = result.additionalUserInfo.username;
  }
}).catch((error) => {
  // Maneja los errores aquí.
  var errorCode = error.code;
  var errorMessage = error.message;
  // El correo electrónico de la cuenta del usuario utilizado.
  var email = error.email;
  // El tipo de proveedor de firebase.auth.AuthCredential que se usó.
  var credential = error.credential;
  // ...
});

/** Termina la sesión. */
async function terminaSesión() {
  try {
    await auth.signOut();
  } catch (e) {
    procesaError(e);
  }
}

/** Procesa un error. Muestra el objeto en la consola y un cuadro de
 * alerta con el mensaje.
 * @param {Error} e descripción del error. */
function procesaError(e) {
  console.log(e);
  alert(e.message);
}

