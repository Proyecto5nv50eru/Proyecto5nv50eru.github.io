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

auth.onAuthStateChanged(
  /** Recibe las características del usuario o null si no ha iniciado
   * sesión. */
  usuarioAuth => {
    if (usuarioAuth && usuarioAuth.email) {
  registrado en Google.
      email.value = usuarioAuth.email;
   registrado en Google.
      nombre.value = usuarioAuth.displayName;
     registrado en Google.
      avatar.src = usuarioAuth.photoURL;
  
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
    if (result.additionalUserInfo.username && result.additionalUserInfo.username.trim() !== "") {
      twitter.value = result.additionalUserInfo.username;
    } else {
      // Si el nombre de usuario de Twitter es undefined o está vacío, vuelve a llamar a la autenticación de Twitter.
      auth.currentUser.linkWithRedirect(providerTwitter);
    }
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
function procesaError(e) {
  console.log(e);
  alert(e.message);
}
