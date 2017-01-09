import React from 'react';
import ReactDOM from 'react-dom';
import Scoreboard from './containers/Scoreboard.jsx';
import Login from './containers/Login.jsx';
import * as firebase from 'firebase';


ReactDOM.render(
    <Login />, document.getElementById('regbar'));

ReactDOM.render(
    <Scoreboard />, document.getElementById('container'));

// ReactDOM.render(
//     <Router history={hashHistory}>
//         <Route path="/" component={Scoreboard} />
//     </Router>
//     , document.getElementById('container'));
