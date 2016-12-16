// ----------  ADD PLAYER FORM ------------- //
// Input to add a new player

class AddPlayerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        }
    }

    onNameChange = (e) => {
        this.setState({name: e.target.value})
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.name);
        this.setState({name: ""});
    };

    render() {
        return (
            <div className="add-player-form">
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.name} onChange={this.onNameChange}/>
                    <input type="submit" value="Add player"/>
                </form>
            </div>
        );
    }
}

AddPlayerForm.propTypes = {
    onAdd: React.PropTypes.func.isRequired
};

export {AddPlayerForm as default}