import React, {Component, PropTypes} from 'react';
import '../styles/App.css';

// Get Elements
// var txtEmail = document.getElementById('txtEmail');
// var txtPassword = document.getElementById('txtPassword');
// var btnLogin = document.getElementById('btnLogin');
// var btnSignUp = document.getElementById('btnSignUp');
// var btnLogout = document.getElementById('btnLogout');

//
// const UserAvatar = props => {
//     return (
//         <img
//             className='avatar'
//             alt={props.name + "'s profile picture"}
//             src={props.photoUrl}
//         />
//     )
// };
// UserAvatar.propTypes = {
//     name: PropTypes.string,
//     src: PropTypes.string
// };
//
//
//
// UserGreeting.propTypes = {
//     name: PropTypes.string
// }


class Greeting extends Component {
    constructor(props) {
        super(props); // auth = true;
        // this.state = {
        //     auth: this.state.auth
        // }
    }

    // guestGreeting = () => {
    //     return <span>You are not signed in.</span>;
    // };

    fetchUserData = () => {
        const userId = firebase.auth().currentUser.uid;
        var fetch = () => {
            var namenew = {};
            firebase.database().ref('/users/' + userId).once('value')
                .then(snapshot => {
                    namenew =  snapshot.val().name;
                })
            return fetch.namenew;
        };
        console.log('fetch is' + fetch());
        return { fetch };
    };

    userGreeting = () => {
        return <span>Hi {this.fetchUserData().fetch}! </span> ;
    };

    // getName = (props, name) => {
    //
    // };
    // userAvatar = props => {
    // return (
    //     <img
    //         className='avatar'
    //         alt={props.name + "'s profile picture"}
    //         src={props.photoUrl} />
    // )
    // };

    render() {
        // const checkauth = () => {
        //     if (this.props.auth) {
        //         return (this.userGreeting);
        //     }
        //     return <span>You are not signed in.</span>
        // };

        return (
            <div className='user-meta'>
                {/*<UserAvatar*/}
                {/*name={props.auth.displayName}*/}
                {/*photoUrl={props.auth.photoURL}/>*/}
                { (this.props.auth) ? this.userGreeting() : <span>You are not signed in.</span> }
            </div>
        )
    };

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
};


const RegisterUserForm = () => {
    return (
        <div className='auth'>
            <label name="name">First name</label>
            <input ref="name" type="name" value={this.state.name} id="txtEmail"/>

            <label name="email">Email</label>
            <input ref="email" type="email" value={this.state.email} id="txtEmail"/>

            <label name="password">Password</label>
            <input ref="pass" type="password" id="txtPassword" value={this.state.password}/>

            <Greeting auth={auth}/>
            <SignInButton onClick={this.handleSignInClick}/>
        </div>
    )
};


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
                    <div className='auth'>
                        <label name="email">Email</label>
                        <input ref="email" type="email" value={this.state.email} id="txtEmail"/>

                        <label name="password">Password</label>
                        <input ref="pass" type="password" id="txtPassword" value={this.state.password}/>

                        <Greeting auth={auth}/>
                        <SignInButton onClick={this.handleSignInClick}/>
                    </div>
                }
            </div>
        );


    };
}

// ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));

export {Login as default}