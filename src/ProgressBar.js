import React, { Component } from 'react';
import './css/ProgressBar.css';

class ProgressBar extends Component {
	render() {
		var progress = {width: this.props.bar + '%'}
		return (
			<div className="progress ProgressBar">
				<div className="progress-bar" role="progressbar" aria-valuemin="0" 
				aria-valuemax="100" style={progress}>
					<span>{this.props.day}</span>
				</div>
			</div>
		);
	}
}

export default ProgressBar;