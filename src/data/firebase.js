// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIuX4WaycasNUEL-eIL9sdXH0iEtenzzw",
  authDomain: "whatthegame-6fcd6.firebaseapp.com",
  databaseURL: "https://whatthegame-6fcd6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "whatthegame-6fcd6",
  storageBucket: "whatthegame-6fcd6.firebasestorage.app",
  messagingSenderId: "979040219796",
  appId: "1:979040219796:web:d9f0a9bd426f0c401f3a81"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtén una referencia a la base de datos
const database = getDatabase(app);

export { database };