// logout.js

// Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDqwXBFh-E0mB3dg89RAcMLSs8dT-pracA",
  
    authDomain: "gridsystem-679c2.firebaseapp.com",
  
    projectId: "gridsystem-679c2",
  
    storageBucket: "gridsystem-679c2.appspot.com",
  
    messagingSenderId: "65987285276",
  
    appId: "1:65987285276:web:574be2fbba864bfbe06ad9",
  
    measurementId: "G-XJ6GDGRN8Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to handle user logout
function logout() {
    // Sign out the user
    auth.signOut().then(() => {
        // Sign-out successful.
        console.log("User signed out successfully");
        // Redirect to login page or any other page
        window.location.href = "signin.html"; // Replace "login.html" with the desired page
    }).catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    logout();
});

