import * as firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyB_O1bE9Sg4YqZkn_OMhFVaRJEwLNg2F5o",
//     authDomain: "invest-startup.firebaseapp.com",
//     projectId: "invest-startup",
//     storageBucket: "invest-startup.appspot.com",
//     messagingSenderId: "12054344704",
//     appId: "1:12054344704:web:3032209163e6e5d26c54e5"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyAOZYuK_PsmWU_tgI28fru3lUuFs-YBac0",
  authDomain: "invest-app-cb1f1.firebaseapp.com",
  projectId: "invest-app-cb1f1",
  storageBucket: "invest-app-cb1f1.appspot.com",
  messagingSenderId: "151518430144",
  appId: "1:151518430144:web:6416e0a6a06cd723cb3e25"
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