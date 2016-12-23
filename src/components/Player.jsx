// ----------  PLAYER ------------- //
// Build the Player name and score from Counter component
// --- Pure component because they act as dependencies to other components and depend on other comp.

import Counter from './Counter.jsx';
import React, {PropTypes} from 'react';


const Player = props => {

    return (
        <div className="player">
            <div className="player-name">
                {/* Remove Button */}
                <a className="remove-player" onClick={props.onRemove}>X</a>
                {props.name}
            </div>
            {/* Player Score */}
            <div className="player-score">
                <Counter score={props.score} onChange={props.onScoreChange}/>
            </div>
        </div>
    )

};

Player.propTypes = {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    onScoreChange: React.PropTypes.func,
    onRemove: React.PropTypes.func.isRequired
};

export {Player as default}