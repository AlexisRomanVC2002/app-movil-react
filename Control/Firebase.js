import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'


const settings = {timestampsInSnapshots: true,merge:true};
const config = {
    apiKey: "AIzaSyC8gVgMQ7muUJROMLYweqgQLEtqbcMhY_w",
    authDomain: "introduccion-5fbcb.firebaseapp.com",
    databaseURL: "https://introduccion-5fbcb-default-rtdb.firebaseio.com",
    projectId: "introduccion-5fbcb",
    storageBucket: "introduccion-5fbcb.appspot.com",
    messagingSenderId: "544838842896",
    appId: "1:544838842896:web:45c71e163fa3b91c022895",
    measurementId: "G-Q1BJH3C9FX"
};
firebase.initializeApp(config);
firebase.firestore().settings(settings);
const storage = firebase.storage;


export default conexion = firebase.firestore()
const auth = firebase.auth() 
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    firebase,
    auth,
   googleAuthProvider,
   storage,
}