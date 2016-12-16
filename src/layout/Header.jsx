import Stats from '../components/Stats.jsx';

// ----------  HEADER ------------- //
class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <Stats players={this.props.players}/>
                <h1>{this.props.title}</h1>
            </div>
        )
    }
}

Header.propTypes = {
    title: React.PropTypes.string.isRequired,
    players: React.PropTypes.array.isRequired // Receive informations about the players
}

export {Header as default}