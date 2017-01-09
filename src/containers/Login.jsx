import React, {Component, PropTypes} from 'react';
import Greeting from '../components/Greeting.jsx';
import * as firebase from 'firebase';
import '../styles/App.css';
import { ref, auth } from '../config/constants';

const SignInButton = props => {
  return (
    <button onClick={props.onClick}>
      Sign in
    </button>
  );
}

const SignOutButton = props => {
  return (
    <button onClick={props.onClick}>
      Sign out
    </button>
  );
};


// ----------  LOGIN FORM ------------- //
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.state = {
      auth: false,
      newname: [],
      newemail: []
    };
  };

  handleSignInClick() {

    const email = this.refs.email.value;
    const pass = this.refs.pass.value;

    auth.signInWithEmailAndPassword(email, pass)
      .catch(function (e) {
        console.log(e.message);
      });

  }

  handleSignOutClick() {
    auth.signOut();
  };

  handleRegisterClick() {
    // Store values from input
    var newname = this.refs.newname.value;
    var newemail = this.refs.newemail.value;
    var newpass = this.refs.newpass.value;

    // Set state with values
    this.setState({
      newname: newname,
      newemail: newemail
    });

    // Promise to register user on Firebase
    auth.createUserWithEmailAndPassword(newemail, newpass)
      .then(function () {
        const userId = auth.currentUser.uid;
        var refUser = firebase.database().ref('/users/');

        // Defining user data structure
        var userInfo = {
          name: newname,
          email: newemail,
          lastConnectTime: new Date(),
          avatar: "testtest"
        };

        // Create a new array of user uid with userInfo data
        refUser.child(userId + '/info/').set(userInfo);

      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

  }

  componentDidMount() {
    // check to see if already signed in.
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({auth: user});
        // this.registerUser(user);
      } else {
        this.setState({auth: false});
      }
    });
  }

  render() {
    const auth = this.state.auth;


    return (
      <div>
        {auth ?
          <div>
            <SignOutButton onClick={this.handleSignOutClick}/>
            <Greeting auth={auth}/>
          </div>
          :
          <div>
            <div className='auth'>
              <label name="email">Email</label>
              <input ref="email" type="email" id="txtEmail"/>

              <label name="password">Password</label>
              <input ref="pass" type="password" id="txtPassword"/>

              <Greeting auth={auth}/>
              <span>Please Login or Register </span>

              <SignInButton onClick={this.handleSignInClick}/>

            </div>
            <div className='register'>
              <label name="newname">First name</label>
              <input ref="newname" type="name" id="txtEmail"/>

              <label name="newemail">Email</label>
              <input ref="newemail" type="email" id="txtEmail"/>

              <label name="newpassword">Password</label>
              <input ref="newpass" type="password" id="txtPassword"/>

              <button onClick={this.handleRegisterClick.bind(this)}> Register</button>
            </div>
          </div>
        }
      </div>
    );
  };
}

// ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));

export {Login as default}