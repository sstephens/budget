/**
 * @module Utils
 *
 */
import firebase from 'firebase/app';
import 'firebase/firestore';

export const firestore = firebase.firestore;

export const loadFireBase = () => {
	const config = {
    apiKey: "AIzaSyCJDLjl0-DPLTVTC30AJCmKPTMT1YGA1M8",
    authDomain: "budget-ce2a7.firebaseapp.com",
    databaseURL: "https://budget-ce2a7.firebaseio.com",
    projectId: "budget-ce2a7",
    storageBucket: "budget-ce2a7.appspot.com",
    messagingSenderId: "303560310286"
	};

  firebase.initializeApp(config);
};

