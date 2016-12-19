// ----------  ADD PLAYER FORM ------------- //
// Input to add a new player
// -- Logical component because they have no dependency on any other components and manage their own state

import React, {Component, PropTypes} from 'react';

class AddPlayerForm extends React.Component {
    static propTypes: {
        onAdd: React.PropTypes.func.isRequired
    };

    state = {
        name: "",
    };

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


export {AddPlayerForm as default}