import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDRhogVB8SojisqIAn5d-XXdi3BEfVsm_E",
    authDomain: "ehsan-fa208.firebaseapp.com",
    projectId: "ehsan-fa208",
    storageBucket: "ehsan-fa208.firebasestorage.app",
    messagingSenderId: "588795997643",
    appId: "1:588795997643:web:b52b8ce94bfd861a92da4e",
    measurementId: "G-WS1T6LY2XV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db};


