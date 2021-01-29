import * as firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB_O1bE9Sg4YqZkn_OMhFVaRJEwLNg2F5o",
    authDomain: "invest-startup.firebaseapp.com",
    projectId: "invest-startup",
    storageBucket: "invest-startup.appspot.com",
    messagingSenderId: "12054344704",
    appId: "1:12054344704:web:3032209163e6e5d26c54e5"
  };

  let app;

  if(firebase.apps.length===0){
    app=firebase.initializeApp(firebaseConfig);
  }else{
    app=firebase.app();
  }

  const db=app.firestore();
  const auth=firebase.auth();

  export {db , auth};