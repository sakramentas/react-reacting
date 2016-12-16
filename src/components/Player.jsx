import Counter from './Counter.jsx';

// ----------  PLAYER ------------- //
// Build the Player name and score from Counter component

class Player extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="player">
                <div className="player-name">
                    {/* Remove Button */}
                    <a className="remove-player" onClick={this.props.onRemove}>X</a>
                    {this.props.name}
                </div>
                {/* Player Score */}
                <div className="player-score">
                    <Counter score={this.props.score} onChange={this.props.onScoreChange}/>
                </div>
            </div>
        )
    }
}

Player.propTypes = {
    name: React.PropTypes.string.isRequired,
        score: React.PropTypes.number.isRequired,
        onScoreChange: React.PropTypes.func,
        onRemove: React.PropTypes.func.isRequired
};

export {Player as default}