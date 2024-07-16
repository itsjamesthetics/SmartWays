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

const dataRef = ref(db, '/traffic/');

const auth = getAuth(); // Initialize Auth

onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    var totalItems = Object.keys(data).length
    console.log(totalItems); // Updated data whenever it changes
    var colorstatus;
    //fill in the page with the menu catalog from the database
    for(let i = 1;i < totalItems+1;i++){
        let strParent = "r" + i;
        if(data[strParent]["traffic"] == "Heavy"){
            colorstatus = "red";
        }else if(data[strParent]["traffic"] == "Moderate"){
            colorstatus = " #FF5733 ";
        }
        else if(data[strParent]["traffic"] == "Light"){
            colorstatus = "green";
        }
        const msgHTML = `
        <div class="card text-center" style="width:80%;margin:auto;margin-top:20px;">
            <div class="card-body">
            <h2 class="card-title">${data[strParent]["name"]}</h2>
            <p class="card-text">Traffic Status in Area</p>
            </div>
            <div class="card-footer text-body-secondary" style="background-color: ${colorstatus};">
                <h4 style="color:white;">${data[strParent]["traffic"]}</h4>
            </div>
        </div>
        `;
        const name = document.getElementById("trafficlist");
        name.insertAdjacentHTML("beforeend", msgHTML);
    }
    
});