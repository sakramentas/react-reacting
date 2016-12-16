import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import AddPlayerForm from './components/AddPlayerForm.jsx';
import Header from './layout/Header.jsx';
import Player from './components/Player.jsx';
import data from './data/players.json';

const PLAYERS = data;

// Global variable for a counter to always be increased. So then we'll never have the same ID.
var nextId = PLAYERS.length + 1;

// Initialize Firebase
// const config = {
//     apiKey: "AIzaSyBo_akpP4rxeT8kSQJwv9uiDuepdu63-i4",
//     authDomain: "reacting-1709d.firebaseapp.com",
//     databaseURL: "https://reacting-1709d.firebaseio.com",
//     storageBucket: "reacting-1709d.appspot.com",
//     messagingSenderId: "551104053276"
// };
// firebase.initializeApp(config);

// Get a reference to the database service
// var database = firebase.database();
function writeNew() {
    // firebase.database().once('value').then((snapshot) => {
    //     console.log("Data received");
    //     console.log(snapshot.val());
    // })
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
        var username = snapshot.val().username;
        // ...
    });
};


// firebase.database().once('value').then(snapshot => {
//     console.log("Data received");
//     console.log(snapshot.val());
// })

// ----------  APPLICATION ------------- //
const Application = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({  //Define the shape of the initial Players coming from the data
            name: React.PropTypes.string.isRequired,
            score: React.PropTypes.number.isRequired,
            id: React.PropTypes.number.isRequired,
        })).isRequired,
    },
    getDefaultProps() {
        return {
            title: "Scoreboard"
        }
    },

    getInitialState() {
        return {
            players: this.props.initialPlayers,
        };
    },
    componentWillMount() {
        var elements = [];

         function loadFirebase (elements){
            return firebase.database()
                .ref('/')
                .once('value')
                .then((snapshot) => {
                // this.elements.push(snapshot.val());
                elements = snapshot.val();
                // this.setState({
                //     initialPlayers: {
                //         name: elements.name,
                //         score: elements.score,
                //         id: elements.id,
                //     }
                // }).bind(this);
                console.log(elements);
                console.log(this);
                elements.push({
                    name: "Laura Palmer",
                    score: 18,
                    id: 85,
                });
            })

        }
        loadFirebase();

        console.log(elements.length);




        console.log("Initializing");

    },
    onScoreChange(index, delta) {
        console.log('onScorechange', index, delta);
        this.state.players[index].score += delta; //Increment value on score
        this.setState(this.state);
    },
    onPlayerAdd(name) {
        this.state.players.push({
            name: name,
            score: 0,
            id: nextId,
        });
        // firebase.database().set({
        //     name: name,
        //     score: 0,
        //     id: nextId,
        // })
        this.setState(this.state);
        nextId += 1;
    },
    onRemovePlayer(index) {
        this.state.players.splice(index, 1);
        this.setState(this.state);
        console.log('remove', index);
    },
    render() {
        return (
            <div className="scoreboard">
                <Header title={this.props.title} players={this.state.players}/>
                <div className="players">
                    {
                        this.state.players.map((player, index) => {
                            return (
                                <Player onScoreChange={ delta => {
                                    this.onScoreChange(index, delta)
                                }}
                                        onRemove={() => {
                                            this.onRemovePlayer(index)
                                        }} //Anonymous function lost this, so it needs to be binded
                                        name={player.name}
                                        score={player.score}
                                        key={player.id}
                                />
                            );
                        })
                    }
                </div>
                <AddPlayerForm onAdd={this.onPlayerAdd}/>
            </div>
        );
    }
});


// const pullInitialPlayers = () => {
//     this.firebaseRef = new Firebase("https://reacting-1709d.firebaseio.com");
//     this.firebaseRef.on("child_added", (dataSnapshot) => {
//         // this.items.push(dataSnapshot.val());
//         console.log(dataSnapshot.val());
//         this.setState({
//             items: this.items
//         });
//     });
// };


ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));

export default Application;