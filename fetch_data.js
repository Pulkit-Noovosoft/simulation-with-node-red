// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import {getDatabase, ref, get, onValue, child} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCcbDa1JzdS6CbF48DPpl1uxWFavoZ7Cs4",
    authDomain: "node-red-d6e8f.firebaseapp.com",
    databaseURL: "https://node-red-d6e8f-default-rtdb.firebaseio.com",
    projectId: "node-red-d6e8f",
    storageBucket: "node-red-d6e8f.appspot.com",
    messagingSenderId: "295506629366",
    appId: "1:295506629366:web:06e240e4f9a2b0e0fd92d7",
    measurementId: "G-KSDWT420MT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase()

const comparePlot = new ControlPlot(document.getElementById("svg3"));
comparePlot.setYRange(30, 50);

const voltagePlot = new ControlPlot(document.getElementById("svg4"));
voltagePlot.setYRange(30, 50);

const temperaturePlot = new ControlPlot(document.getElementById("svg5"));
temperaturePlot.setYRange(30, 50);

// Number of points to be plotted
const frequency = 25;

// TODO: instead of plotting all 25 points, try to plot only last point

// Will be called when new voltage reading is added
onValue(ref(db, "voltage"), (snapshot) => {
    const data = Object.entries(snapshot.val());
    const voltage = data.slice(data.length - frequency, data.length);

    // console.log(data)

    comparePlot.plotPoints(voltage, "blue", frequency)
    voltagePlot.plotPoints(voltage, "blue", frequency * 2)
})

// Will be called when new temperature reading is added
onValue(ref(db, "temperature"), (snapshot) => {
    const data = Object.entries(snapshot.val());
    const temperature = data.slice(data.length - frequency, data.length);

    comparePlot.plotPoints(temperature, "green", frequency * 3)
    temperaturePlot.plotPoints(temperature, "green", frequency * 4)
})
