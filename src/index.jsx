import React from 'react';
import ReactDOM from 'react-dom';
import Scoreboard from './containers/Scoreboard.jsx';
import Login from './containers/Login.jsx';

const config = {
    apiKey: "AIzaSyBo_akpP4rxeT8kSQJwv9uiDuepdu63-i4",
    authDomain: "reacting-1709d.firebaseapp.com",
    databaseURL: "https://reacting-1709d.firebaseio.com",
    storageBucket: "reacting-1709d.appspot.com",
    messagingSenderId: "551104053276"
};
firebase.initializeApp(config);

ReactDOM.render(
    <Login />, document.getElementById('regbar'));

ReactDOM.render(
  <Scoreboard />, document.getElementById('container'));
