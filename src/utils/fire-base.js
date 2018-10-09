/**
 * @module Utils
 *
 */
import firebase from 'firebase/app';
import 'firebase/firestore';

export const firestore = firebase.firestore;

export const loadFireBase = () => {
	const config = {
		apiKey: window.FIREBASE_APIKEY,
		authDomain: window.FIREBASE_AUTH_DOMAIN,
		databaseURL: window.FIREBASE_DATABASE_URL,
		projectId: window.FIREBASE_PROJECT_ID,
		storageBucket: window.FIREBASE_STORAGE_BUCKET,
		messagingSenderId: window.FIREBASE_MESSAGING_SENDER_ID,
	};

	window.console.log('config', config, window.process);

  firebase.initializeApp(config);
};

