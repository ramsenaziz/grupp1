import React, {Component} from 'react';
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
				<div className='retrospective well well-lg'>
					<h1>Time for a retrospective!</h1>
					<p>
						How did this sprint go? <br/>
						What things could you improve in the next sprint?<br/>
						<br/>
						Click "next day" when you are ready to continue.
					</p>
					<p>{this.state.time}</p>
					<button onClick={this.props.done} className='btn btn-success'>Next Sprint!</button>
				</div>
			</div>
			
		)
	}
}

export default Retrospective;