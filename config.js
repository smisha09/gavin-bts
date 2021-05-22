import * as firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyC6ZUIS1oEARXPwAhjkIi5dTZ6Jhogo3uU",
    authDomain: "story-hub-25826.firebaseapp.com",
    projectId: "story-hub-25826",
    storageBucket: "story-hub-25826.appspot.com",
    messagingSenderId: "406863846265",
    appId: "1:406863846265:web:4be78f2cb6af789c5eada8"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();