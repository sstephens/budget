/**
 * @module Utils
 *
 */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



if (!window.isFirebaseLoaded) {
	window.isFirebaseLoaded = true;
	loadFireBase();
}

export const firestore = firebase.firestore;
export const auth = firebase.auth;

export const loadFireBase = () => {
	const config = {
		apiKey: process.env.FIREBASE_APIKEY,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.FIREBASE_DATABASE_URL,
		projectId: process.env.FIREBASE_PROJECT_ID,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	};

	window.console.log('firebase', config);
  firebase.initializeApp(config);
};

// The behavior for Date objects stored in Firestore is going to change
// AND YOUR APP MAY BREAK.
// To hide this warning and ensure your app does not break, you need to add the
// following code to your app before calling any other Cloud Firestore methods:

//   const firestore = firebase.firestore();
//   const settings = {[> your settings... <] timestampsInSnapshots: true};
//   firestore.settings(settings);

// With this change, timestamps stored in Cloud Firestore will be read back as
// Firebase Timestamp objects instead of as system Date objects. So you will also
// need to update code expecting a Date to instead expect a Timestamp. For example:

//   // Old:
//   const date = snapshot.get('created_at');
//   // New:
//   const timestamp = snapshot.get('created_at');
//   const date = timestamp.toDate();

// Please audit all existing usages of Date when you enable the new behavior. In a
// future release, the behavior will change to the new behavior, so if you do not
// follow these steps, YOUR APP MAY BREAK.<Paste>

