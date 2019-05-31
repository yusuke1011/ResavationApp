import Vue from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'

// Firebaseの設定
const firebaseConfig = {
    apiKey: "AIzaSyA7yxmdWnINOQTDVoDCjSjEmPGrzo4QZ5M",
    authDomain: "km-image.firebaseapp.com",
    databaseURL: "https://km-image.firebaseio.com",
    projectId: "km-image",
    storageBucket: "km-image.appspot.com",
    messagingSenderId: "938207171059",
    appId: "1:938207171059:web:2bd52aa3e82909ca"
  };
  
  // Firebaseの初期化
  firebase.initializeApp(firebaseConfig);
  
  //firestoreの初期化
  export const db = firebase.firestore();