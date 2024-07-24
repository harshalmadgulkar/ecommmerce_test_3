// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCuaE9k_C27Gaih7v2uwa3wTNnAchNrx5U',
  authDomain: 'e-commerce-test3.firebaseapp.com',
  projectId: 'e-commerce-test3',
  storageBucket: 'e-commerce-test3.appspot.com',
  messagingSenderId: '612479126082',
  appId: '1:612479126082:web:ea5df7aea3c9f40f04bbdb',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export dataBase
const db = getFirestore(app);
export { db };
