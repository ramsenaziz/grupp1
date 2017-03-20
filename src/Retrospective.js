import React, { Component } from 'react';
import './css/Retrospective.css';

class Retrospective extends Component {

	constructor() {
		super();
		this.state = {
			visible: false
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
					<button
					style={{
						width:'330px',
					}}
						onClick={this.props.done} className='btn btn-primary'>Next Sprint!</button>
				</div>
			</div>
		)
	}
}

export default Retrospective;