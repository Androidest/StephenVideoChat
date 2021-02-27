import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

{
    const firebaseConfig = {
        apiKey: "AIzaSyByUAid1ySJpc7RGmLGdtsuceuFLJcr32A",
        authDomain: "react-tensor-app.firebaseapp.com",
        projectId: "react-tensor-app",
        storageBucket: "react-tensor-app.appspot.com",
        messagingSenderId: "710084648290",
        appId: "1:710084648290:web:f9b770ead99b5f0c8aa03b",
        measurementId: "G-L446FGJC6L"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}

export const db = firebase;
export const dbAuth = firebase.auth();
export const dbStore = firebase.firestore();

