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

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// export { app, auth, db};


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyD1ZU6AEfOapkONZ39vTUcvMht6THpzCgo",
//     authDomain: "test-af340.firebaseapp.com",
//     databaseURL: "https://test-af340-default-rtdb.firebaseio.com",
//     projectId: "test-af340",
//     storageBucket: "test-af340.firebasestorage.app",
//     messagingSenderId: "453849917773",
//     appId: "1:453849917773:web:4ee11f9afd104e68f4ef04",
//     measurementId: "G-507S5MZ71Z"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };