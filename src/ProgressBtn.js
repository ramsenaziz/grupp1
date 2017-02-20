import React, { Component } from 'react';

class ProgressBtn extends Component {
		
	handleClick() {
		if (this.props.enabled) {
			this.props.handleClick();
		}
	}
	
	render() {
		// If the dice haven't been rolled, this.props.enabled === false, so it has to be inversed so isDisabled === true
		var isDisabled = !this.props.enabled;
		
		return (
			<button disabled={isDisabled} type='button' className="btn btn-success" onClick={this.handleClick.bind(this)}>
				<strong>Next day</strong>
				<span className="glyphicon glyphicon-triangle-right"></span>
			</button>
		);
	}
}

export default ProgressBtn;