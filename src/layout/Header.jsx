import Stats from '../components/Stats.jsx';
import Stopwatch from '../components/Stopwatch.jsx';

import React, {PropTypes} from 'react';

// ----------  HEADER ------------- //
// --- Pure component because they act as dependencies to other components and depend on other comp.

const Header = props => {

    return (
        <div className="header">
            <Stats players={props.players}/>
            <h1>{props.title}</h1>
            <Stopwatch />
        </div>
    )

}

Header.propTypes = {
    title: React.PropTypes.string.isRequired,
    players: React.PropTypes.array.isRequired // Receive informations about the players
}

export {Header as default}