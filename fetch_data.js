// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import {getDatabase, onValue, ref} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
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
const averageTime = 180;

// TODO: instead of plotting all 25 points, try to plot only latest point

// Will be called when new voltage reading is added
onValue(ref(db, "voltage"), (snapshot) => {
    const data = Object.entries(snapshot.val());
    const voltage = data.slice(data.length - frequency, data.length);
    const voltageAverage = getAverage(data);

    comparePlot.plotPoints(voltage, "blue", frequency)
    voltagePlot.plotPoints(voltageAverage, "blue", frequency * 2)
})

// Will be called when new temperature reading is added
onValue(ref(db, "temperature"), (snapshot) => {
    const data = Object.entries(snapshot.val());
    const temperature = data.slice(data.length - frequency, data.length);
    const temperatureAverage = getAverage(data);

    comparePlot.plotPoints(temperature, "green", frequency * 3)
    temperaturePlot.plotPoints(temperatureAverage, "green", frequency * 4)
})

// Getting average
function getAverage(rawData) {
    const data = getRequiredSampleSize(rawData);
    const binSize = data.length / frequency;

    const averageData = [];
    for (let i = binSize; i <= data.length; i += binSize) {
        averageData.push(calAverage(data.slice(i - binSize, i)));
    }

    return averageData;
}

// Will find average for each interval of 3 mins
function calAverage(data) {
    const timeSum = data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue[0];
    }, 0);

    const valueSum = data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue[1];
    }, 0);

    return [Math.round(timeSum / data.length).toString(), (valueSum / data.length)];
}

function getRequiredSampleSize(rawData) {
    const data = castTimeToNumber(rawData);
    const interval = getInterval(data);
    return data.slice(data.length - frequency * Math.round(averageTime / interval),
        data.length);
}

function castTimeToNumber(rawData) {
    return rawData.map(dataPoint => {
        return [parseInt(dataPoint[0]), dataPoint[1]];
    })
}

// Dynamically finds time interval between two data-points
function getInterval(data) {
    return Math.round((data[data.length - 1][0] - data[data.length - 2][0]) / 1000);
}