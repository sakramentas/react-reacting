import React, {Component, PropTypes} from 'react';
import '../styles/App.css';

// Get Elements
// var txtEmail = document.getElementById('txtEmail');
// var txtPassword = document.getElementById('txtPassword');
// var btnLogin = document.getElementById('btnLogin');
// var btnSignUp = document.getElementById('btnSignUp');
// var btnLogout = document.getElementById('btnLogout');


const UserAvatar = props => {
    return (
        <img
            className='avatar'
            alt={props.name + "'s profile picture"}
            src={props.photoUrl}/>
    )
};
UserAvatar.propTypes = {
    name: PropTypes.string,
    src: PropTypes.string
};

function UserGreeting(props) {
    return (
        <span>Hi {props.name}!</span>
    );
}
UserGreeting.propTypes = {
    name: PropTypes.string
}

function GuestGreeting(props) {
    return <span>You are not signed in.</span>;
}

function Greeting(props) {
    if (props.auth) {
        return (
            <div className='user-meta'>
                <UserAvatar
                    name={props.auth.displayName}
                    photoUrl={props.auth.photoURL}/>
                <UserGreeting
                    name={props.auth.displayName}/>
            </div>
        )
    }
    return <GuestGreeting />;
}

function SignInButton(props) {
    return (
        <button onClick={props.onClick}>
            Sign in
        </button>
    );
}

function SignOutButton(props) {
    return (
        <button onClick={props.onClick}>
            Sign out
        </button>
    );
}


// ----------  LOGIN FORM ------------- //
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSignInClick = this.handleSignInClick.bind(this);
        this.handleSignOutClick = this.handleSignOutClick.bind(this);
        this.state = {
            auth: false
        };
    };

    handleSignInClick() {
        // const provider = new firebase.auth.GoogleAuthProvider();
        const auth = firebase.auth();
        // auth.signInWithPopup(provider);

        const email = this.refs.email.value;
        const pass = this.refs.pass.value;

        var promise = auth.signInWithEmailAndPassword(email, pass);
        promise
            .catch(function (e) {
                console.log(e.message);
            });

    }

    handleSignOutClick() {
        const auth = firebase.auth();
        auth.signOut();
    }

    componentDidMount() { // check to see if already signed in.
        const auth = firebase.auth();
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({auth: user});
                this.registerUser(user);
            } else {
                this.setState({auth: false});
            }
        });
    }

    registerUser(user) {
        const userRef = firebase.database().ref('users/' + user.uid);
        userRef.update({
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            lastConnectTime: new Date()
        });
    }

    render() {
        // return (
        //     <div id="navthing">
        //         <h2><a href="#" id="loginform">Login</a> | <a href="#">Register</a></h2>
        //         <div className="login">
        //             <div className="arrow-up"></div>
        //             <div className="formholder">
        //                 <div className="randompad">
        //                     <fieldset>
        //                         <label name="email">Email</label>
        //                         <input type="email" value="" id="txtEmail"/>
        //
        //                         <label name="password">Password</label>
        //                         <input type="password" id="txtPassword"/>
        //
        //                         <input type="submit" value="Login" id="btnLogin" onClick={this.loginUser}/>
        //                         <input type="submit" value="SignUp" id="btnSignUp"/>
        //                         <input type="submit" value="Logout" id="btnLogout"/>
        //
        //                     </fieldset>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // );
        const auth = this.state.auth;

        let button = null;
        let form = null;
        if (auth) {
            button = <SignOutButton onClick={this.handleSignOutClick}/>;
        } else {
            form = () => {
                return (
                    <div className='auth'>
                    <label name="email">Email</label>
                    <input ref="email" type="email" value={this.state.email} id="txtEmail"/>

                    <label name="password">Password</label>
                    <input ref="pass" type="password" id="txtPassword" value={this.state.email}/>

                    <Greeting auth={auth}/>
                    <SignInButton onClick={this.handleSignInClick}/>
                </div>
                );
            }
        }
        return (
            {form}
        );


    };
}

// ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));

export {Login as default}