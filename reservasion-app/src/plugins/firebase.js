import Vue from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCJ0MEnFFlosaaDp02JChZzxkml6dNVv2I",
  authDomain: "reservationapp-c13cf.firebaseapp.com",
  databaseURL: "https://reservationapp-c13cf.firebaseio.com",
  projectId: "reservationapp-c13cf",
  storageBucket: "reservationapp-c13cf.appspot.com",
  messagingSenderId: "980225099094",
  appId: "1:980225099094:web:9b0965d59f6adb8e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firestoreの初期化
export const db = firebase.firestore();