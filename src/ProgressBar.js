import React, { Component } from 'react';

class ProgressBar extends Component {
	render() {
		var progress = {width: this.props.bar + '%'}
		return (
			<div className="progress">
				<div className="progress-bar" role="progressbar" aria-valuemin="0" 
				aria-valuemax="100" style={progress}>
				</div>
			</div>
		);
	}
}

export default ProgressBar;