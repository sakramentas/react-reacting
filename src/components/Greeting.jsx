import React, {Component, PropTypes} from 'react';
import { ref, auth } from '../config/constants'
import firebase from 'firebase';

class Greeting extends React.Component {
  constructor(props) {
    super(props); // auth = true;
    this.state = {
    }
  }

  fetchUserData() {
    // Fetch User data from database
    const userId = auth.currentUser.uid;
    if (this.props.auth) {
      firebase.database().ref('/users/' + userId).once('value')
        .then(snapshot => {
          this.setState({
            name: snapshot.val().info.name,
            avatar: snapshot.val().info.avatar
          })
        });
    }
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

export {Greeting as default}