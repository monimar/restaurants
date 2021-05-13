import firebase from 'firebase'
require('firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyDlpKGGoEe6J9YE2F3-4JCt3nZ3WfRZ6iQ",
  authDomain: "restaurants-6d79d.firebaseapp.com",
  projectId: "restaurants-6d79d",
  storageBucket: "restaurants-6d79d.appspot.com",
  messagingSenderId: "742883847428",
  appId: "1:742883847428:web:f8b1553c0c7eab058af451"
}

  export const firebaseApp = firebase.initializeApp(firebaseConfig)