// ----------  Stopwatch ------------- //
// Just a stopwatch
// -- Logical component because they have no dependency on any other components and manage their own state

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        // Thats equivalent to getInitialState
        this.state = {
            running: false,
            elapsedTime: 0,
            previousTime: 0,
        }
    }

    componentDidMount() {
        this.interval = setInterval(this.onTick.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onTick() {
        if (this.state.running) {
            let now = Date.now();
            this.setState({
                previousTime: now,
                elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
            })
        }
    }

    onStart() {
        this.setState({
            running: true,
            previousTime: Date.now(),
        })
    }

    onStop() {
        this.setState({ running: false })
    }

    onReset() {
        this.setState({
            elapsedTime: 0,
            previousTime: Date.now(),
        })
    }

    render() {
        var seconds = Math.floor(this.state.elapsedTime / 1000);
        return (
            <div className="stopwatch">
                <h2>Stopwatch</h2>
                <div className="stopwatch-time">{ seconds }</div>
                { this.state.running ?
                    <button onClick={this.onStop.bind(this)}>Stop</button>
                    :
                    <button onClick={this.onStart.bind(this)}>Start</button>
                }
                <button onClick={this.onReset.bind(this)}>Reset</button>
            </div>
        )
    }
}


export {Stopwatch as default}