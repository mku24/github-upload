import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC-CtZYAjQg1tCnVvHJbW5yCO23Y9eUFMA",
  authDomain: "elertv1-f830f.firebaseapp.com",
  projectId: "elertv1-f830f",
  storageBucket: "elertv1-f830f.appspot.com",
  messagingSenderId: "100754216844",
  appId: "1:100754216844:web:f482267d4b00910661e8a9"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire