import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDfBkvNq1POkisueM8AygiCmwX0B1dkU4c",
  authDomain: "walletbuddy-31b25.firebaseapp.com",
  projectId: "walletbuddy-31b25",
  storageBucket: "walletbuddy-31b25.appspot.com",
  messagingSenderId: "965064706228",
  appId: "1:965064706228:web:d6c2404cebfb161467efe1",
  measurementId: "G-6BJ23SD9TQ"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { timestamp }
export default firebaseApp.firestore()
