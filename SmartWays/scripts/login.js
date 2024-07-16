// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqwXBFh-E0mB3dg89RAcMLSs8dT-pracA",
  
    authDomain: "gridsystem-679c2.firebaseapp.com",
  
    projectId: "gridsystem-679c2",
  
    storageBucket: "gridsystem-679c2.appspot.com",
  
    messagingSenderId: "65987285276",
  
    appId: "1:65987285276:web:574be2fbba864bfbe06ad9",
  
    measurementId: "G-XJ6GDGRN8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication with the app instance


const provider = new GoogleAuthProvider();

// Set persistence to LOCAL
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the browser will clear any existing state.
    console.log("Authentication persistence set successfully.");
  })
  .catch((error) => {
    // Handle errors
    console.error(error.code);
    console.error(error.message);
  });

const signingoogle = document.querySelector(".google-login");
signingoogle.addEventListener("click", function(event){
  event.preventDefault();
  const auth2 = getAuth();

  signInWithPopup(auth2, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user.displayName);
      alert("Signed in successfully using google");
      window.location.href = "index.html";
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

const submitButton = document.querySelector(".login-button");

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  
  // Check if a user is already logged in
  const user = auth.currentUser;
  if (user) {
    console.log(user["email"]); //getting the user email of the user that is being logged in
    alert("A user is already logged in.");
    window.location.href = "index.html";
    return; // Stop further execution
  }

  //inputs
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  signInWithEmailAndPassword(auth, email, password)
   // After successful sign-in
    .then((userCredential) => {
    // Signed in successfully
    const user = userCredential.user;
    alert("Signed in successfully");
    window.location.href = "index.html";
    })

    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
