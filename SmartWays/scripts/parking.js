// Your web app's Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js"; // Add auth module import
import { getDatabase, ref, set, push, onValue, get, child} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDqwXBFh-E0mB3dg89RAcMLSs8dT-pracA",

    authDomain: "gridsystem-679c2.firebaseapp.com",
  
    databaseURL: "https://gridsystem-679c2-default-rtdb.asia-southeast1.firebasedatabase.app",
  
    projectId: "gridsystem-679c2",
  
    storageBucket: "gridsystem-679c2.appspot.com",
  
    messagingSenderId: "65987285276",
  
    appId: "1:65987285276:web:574be2fbba864bfbe06ad9",
  
    measurementId: "G-XJ6GDGRN8Q"
};


const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const dataRef = ref(db, '/data/');

const auth = getAuth(); // Initialize Auth


onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    var totalItems = Object.keys(data).length
    console.log(totalItems); // Updated data whenever it changes
    
    //fill in the page with the menu catalog from the database
    for(let i = 1;i < totalItems+1;i++){
        let strParent = "p" + i;
        const msgHTML = `
        <div class="card text-center" style="width:80%;margin:auto;margin-top:20px;">
                <div class="card-body">
                  <h5 class="card-title">${data[strParent]["name"]}</h5>
                  <p class="card-text">Hassle-free parking, more time for you. </p>
                  <button type="button" class="btn btn-success" id="getParking" onclick="parkSelect('${strParent}')">Find Parking</button>
                </div>
                <div class="card-footer text-body-secondary">
                  Capacity: ${data[strParent]["currentOccupancy"]}/${data[strParent]["maxspace"]}
                </div>
        </div>
        `;
        const name = document.getElementById("parkinglotlist");
        name.insertAdjacentHTML("beforeend", msgHTML);
    }
    
});

