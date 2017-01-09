import firebase from 'firebase';

export const config = {
    apiKey: "AIzaSyBo_akpP4rxeT8kSQJwv9uiDuepdu63-i4",
    authDomain: "reacting-1709d.firebaseapp.com",
    databaseURL: "https://reacting-1709d.firebaseio.com",
    storageBucket: "reacting-1709d.appspot.com",
    messagingSenderId: "551104053276"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const auth = firebase.auth();