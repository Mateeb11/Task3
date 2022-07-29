import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC6djYKfwoc04PLDpGmqNhI42c8Vzlov0w",
    authDomain: "database-aacbb.firebaseapp.com",
    databaseURL: "https://database-aacbb-default-rtdb.firebaseio.com",
    projectId: "database-aacbb",
    storageBucket: "database-aacbb.appspot.com",
    messagingSenderId: "364141524109",
    appId: "1:364141524109:web:b925005b460045e3cc5ec4",
    measurementId: "G-SVDBZCFL5W",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const writeDB = (integer) => {
    const reference = ref(db, "sensor/");
    set(reference, {
        data: integer,
    });
};

const input = document.querySelector("#input");
const button = document.querySelector(".button");

button.addEventListener("click", function () {
    writeDB(Number(input.value));
    alert("The value has been sent");
    input.value = "";
});
