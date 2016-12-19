// ----------  Counter ------------- //
// Increment, decrement and shows how many points each player has.
// --- Pure component because they're written as pure functions and rely on props passed down to them

import React, {PropTypes} from 'react';

const Counter = props => {

    return (
        <div className="counter">
            <button
                className="counter-action decrement"
                onClick={() => {
                    props.onChange(-1)
                }}
            > -
            </button>
            <div className="counter-score"> {props.score} </div>
            <button className="counter-action increment"
                    onClick={() => {
                        props.onChange(1)
                    }}
            > +
            </button>
        </div>
    )
}

//checkPositive - only decrement when its greater than 0. TODO
// Counter.checkPositive = () => {
//     if (this.props.score > 0) {
//         return this.props.onChange(-1);
//     }
//     return this.props.score
// };

Counter.propTypes = {
    score: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
};

export {Counter as default}