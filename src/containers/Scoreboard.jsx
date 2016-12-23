import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../styles/App.css';
import AddPlayerForm from '../components/AddPlayerForm.jsx';
import Header from '../layout/Header.jsx';
import Player from '../components/Player.jsx';
// import data from './data/players.json';

const INITIAL_STATE = {
    players: [
        {
            name: "Lucas Sacramento",
            score: 98,
            id: 1
        },
        {
            name: "Olivia Walthew",
            score: 60,
            id: 2
        },
        {
            name: "Jayro Tavora",
            score: 30,
            id: 3
        },
        {
            name: "Bruno",
            score: 46,
            id: 4
        },
        {
            name: "Brendan Lawlor",
            score: 4,
            id: 5
        }
    ]
}

// Global variable for a counter to always be increased. So then we'll never have the same ID.
var nextId = INITIAL_STATE.players.length + 1;

// ----------  APPLICATION ------------- //
class Scoreboard extends React.Component {

    state = INITIAL_STATE;

    onScoreChange = (index, delta) => {
        console.log('onScorechange', index, delta);
        this.state.players[index].score += delta; //Increment value on score
        this.setState(this.state);
    };

    onPlayerAdd = name => {
        console.log(this);
        this.state.players.push({
            name: name,
            score: 0,
            id: nextId,
        });
        this.setState(this.state);
        nextId += 1;
    };

    onRemovePlayer = (index) => {
        this.state.players.splice(index, 1);
        this.setState(this.state);
        console.log('remove', index);
    };

    render() {
        return (
            <div className="scoreboard">
                <Header title={this.props.title} players={this.state.players}/>
                <div className="players">
                    {
                        this.state.players.map((player, index) => {
                            return (
                                <Player
                                    onScoreChange={ delta => {
                                        this.onScoreChange(index, delta)
                                    }}
                                    onRemove={ () => {
                                        this.onRemovePlayer(index)
                                    }}
                                    name={player.name}
                                    score={player.score}
                                    key={player.id}
                                />
                            );
                        })
                    }
                </div>
                <AddPlayerForm onAdd={this.onPlayerAdd} />
            </div>
        );
    };
}

Scoreboard.propTypes = {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({  //Define the shape of the initial Players coming from the data
        name: React.PropTypes.string.isRequired,
        score: React.PropTypes.number.isRequired,
        id: React.PropTypes.number.isRequired,
    })),
};

Scoreboard.defaultProps = {
    title: "Scoreboard"
};

export {Scoreboard as default}