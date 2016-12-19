// ----------  STATS ------------- //
// Stats doens't have so many properties and states, so it's not necessary to create a new React class.
// --- Pure component because they're written as pure functions and rely on props passed down to them

import React, { PropTypes } from 'react';

const Stats = props => {
    const totalPlayers = props.players.length;
    const totalPoints = props.players.reduce( (total, player)  => { //TODO : Search about reduce
        return total + player.score;
    }, 0);

    return (
        <table className="stats">
            <tbody>
            <tr>
                <td>Total Players:</td>
                <td>{totalPlayers}</td>
            </tr>
            <tr>
                <td>Total Points:</td>
                <td>{totalPoints}</td>
            </tr>
            </tbody>
        </table>
    )
}

Stats.propTypes = {
    players: React.PropTypes.array.isRequired,
};

export {Stats as default}