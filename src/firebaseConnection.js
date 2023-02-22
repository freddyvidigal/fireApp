import { initializeApp }  from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";




const firebaseConfig = {
    apiKey: "AIzaSyCdiC8fBYMCVhZyODvPwum1wtHessO4sVg",
    authDomain: "curso-react-f76ea.firebaseapp.com",
    projectId: "curso-react-f76ea",
    storageBucket: "curso-react-f76ea.appspot.com",
    messagingSenderId: "1010823153178",
    appId: "1:1010823153178:web:12631ce848aaab6a98b3a3",
    measurementId: "G-Z2VQZNTR9Y"
  };

 const firebaseApp = initializeApp(firebaseConfig); 

 const db = getFirestore(firebaseApp);

 const auth = getAuth(firebaseApp)

 export { db, auth };