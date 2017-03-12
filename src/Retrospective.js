import React, { Component } from 'react';
import './css/Retrospective.css';

class Retrospective extends Component {

	constructor() {
		super();
		this.state = {
			time: 300,
			visible: false
		}
	}

	tick() {
		var time = this.state.time - 1;
		this.setState({ time: time });
	}

	componentDidMount() {
		if (this.props.visible) {
			var timer = setInterval(this.tick.bind(this), 1000);
			this.setState({ timer: timer });
		}
	}

	render() {
		var display = this.props.visible ? 'block' : 'none';
		var style = { display: display };

		return (
			<div style={style} className='background'>
				<div style={{
					background: 'black',
					color: 'white',
					paddingTop: '0px',
					paddingBottom: '10px',
					border: '5px white solid',

				}} className='retrospective well well-lg'>
					<h2>Time for a retrospective!</h2>
					<p>
						How did this sprint go? <br />
						What things could you improve in the next sprint?<br />
						<br />
						Click "Next Sprint" when you are ready to continue.
					</p>
					<p>{this.state.time}</p>
					<button
					style={{
						width:'330px',
					}}
						onClick={this.props.done} className='btn btn-secondary'>Next Sprint!</button>
				</div>
			</div>

		)
	}
}

export default Retrospective;