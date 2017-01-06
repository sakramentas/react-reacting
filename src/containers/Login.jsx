import React, {Component, PropTypes} from 'react';
import '../styles/App.css';


class Greeting extends React.Component {
    constructor(props) {
        super(props); // auth = true;
        this.state = {
            name: [],
            email: [],
            avatar: [],
            uid: [],
        }
    }

    fetchUserData() {
        // Fetch User data from database
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId).once('value')
            .then(snapshot => {
                this.setState({
                    name: snapshot.val().name,
                    avatar: snapshot.val().avatar
                })
            });
    };

    componentWillMount() {
        // If logged fetch user data
        if (this.props.auth) {
            return this.fetchUserData();
        }
    };

    userGreeting() {
        return (
            <div>
                <span>Hi { this.state.name } ! </span>
                <img src={ this.state.avatar } style={{width: '50px', height: '50px'}}/>
            </div>
        );
    };


    render() {
        return (
            <div className='user-meta'>
                { (this.props.auth) ? this.userGreeting() : <span>You are not signed in.</span> }
            </div>
        )
    };

}

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
        const auth = firebase.auth();

        const email = this.refs.email.value;
        const pass = this.refs.pass.value;

        auth.signInWithEmailAndPassword(email, pass)
            .catch(function (e) {
                console.log(e.message);
            });

    }

    handleSignOutClick() {
        firebase.auth().signOut();
    };

    handleRegisterClick(user) {
        const auth = firebase.auth();

        var newname = this.refs.newname.value;
        var newemail = this.refs.newemail.value;
        var newpass = this.refs.newpass.value;

        this.setState({
            newname: newname,
            newemail: newemail
        });

        auth.createUserWithEmailAndPassword(newemail, newpass)
            .then(function(user, newname, newemail) {
                var newPostKey = firebase.database().ref().child('users').push().user.uid;
                firebase.database().ref('users/' + user.uid).update({
                    name: newname,
                    email: newemail,
                    lastConnectTime: new Date()
                });
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
    }

    componentDidMount() {
        // check to see if already signed in.
        const auth = firebase.auth();
        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({auth: user});
                // this.registerUser(user);
            } else {
                this.setState({auth: false});
            }
        });
    }

    // registerUser(user) {
    //     const userRef = firebase.database().ref('users/' + user.uid);
    //     userRef.update({
    //         name: user.displayName,
    //         email: user.email,
    //         photoUrl: user.photoURL,
    //         lastConnectTime: new Date()
    //     });
    // }

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
                            <input ref="email" type="email"  id="txtEmail"/>

                            <label name="password">Password</label>
                            <input ref="pass" type="password" id="txtPassword" />

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

                            <button onClick={this.handleRegisterClick}> Register</button>
                        </div>
                    </div>
                }
            </div>
        );
    };
}

// ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));

export {Login as default}