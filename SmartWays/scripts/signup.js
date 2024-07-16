// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
const auth = getAuth(); // Initialize Firebase Authentication

const db = getFirestore(); // Initialize Firestore

const submit = document.getElementById("signup-button");

submit.addEventListener("click", function (event) {
    event.preventDefault();
  
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const fname = document.getElementById("username-input").value;
    // const lname = document.getElementById("lname").value;
    //const phoneNumber = document.getElementById("phoneNumber").value;
  
    // Create user in Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Add user details to Firestore
        const user = userCredential.user;
        // Get the current number of users to generate the new user ID
        return getDocs(query(collection(db, "users"), orderBy("userId", "desc"), limit(1)))
          .then((querySnapshot) => {
            let userId = 1; // Default user ID
            querySnapshot.forEach((doc) => {
              // Increment user ID
              userId = doc.data().userId + 1;
            });
            // Add user to Firestore with generated user ID
            return addDoc(collection(db, "users"), {
              userId: userId,
              uid: user.uid,
              email: email,
              firstName: fname,
            });
          });
      })
      .then(() => {
        // Signed up and user details added to Firestore
        alert("Account Created Successfully, Log in with youre Credentials in the log in page.");
        window.location.href = "index.html";
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  });
  

