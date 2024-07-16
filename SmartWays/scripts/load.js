// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, collection, getDocs, where, query } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";


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

const db = getFirestore(); // Initialize Firestore


function fetchUserDetails(uid) {
    const userDetailsDiv = document.getElementById("userDetailsPlaceholder");

    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("uid", "==", uid));

    getDocs(userQuery)
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                
                console.log("No matching documents.");
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        document.getElementById("Username").innerHTML = user["email"];
                        
                    } else {
                        document.getElementById("Username").innerHTML = "Default";
                       console.log("no user is being logged in");
                    }
                });
                return;
            }

            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                
                document.getElementById("Username").innerHTML = userData.firstName;
               
            });

            
        })
        .catch((error) => {
            console.error("Error fetching user details:", error);
        });
}


document.addEventListener("DOMContentLoaded", () => {
    

    //checks if there is an account being logged in or not
    auth.onAuthStateChanged((user) => {
        if (user) {
            fetchUserDetails(user.uid);
            console.log(user["email"]);
            console.log("user account is logged in");
            
        } else {
            document.getElementById("Username").innerHTML = "Default";
           console.log("no user is being logged in");
        }
    });
  
});



// Fetch and inject the header
fetch('header.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('header').innerHTML = html;
        console.log("Header loaded successfully");

        // Now that the header is loaded, attach the event listener
        document.getElementById("user-logo").onclick = function() {
            var submenu = document.getElementById("subMenu");
            submenu.classList.toggle('open-menu');
        };
    })
    .catch(error => console.error('Error loading the header:', error));

// Fetch and inject the footer
fetch('footer.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('footer').innerHTML = html;
        console.log('Footer loaded successfully');
    })
    .catch(error => {
        console.error('Error loading the footer:', error);
    });