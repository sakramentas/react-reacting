// ----------  Counter ------------- //
// Increment, decrement and shows how many points each player has.

class Counter extends React.Component {
    constructor(props) {
        super(props);
    }

    //checkPositive - only decrement when its greater than 0.
    checkPositive = () => {
        if (this.props.score > 0) {
            return this.props.onChange(-1);
        }
        return this.props.score
    };

    render() {
        return (
            <div className="counter">
                <button
                    className="counter-action decrement"
                    onClick={this.checkPositive}
                > -
                </button>
                <div className="counter-score"> {this.props.score} </div>
                <button className="counter-action increment"
                        onClick={() => { this.props.onChange(1) }}
                > +
                </button>
            </div>
        )
    }
}

Counter.propTypes = {
    score: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
}

export {Counter as default}