import React, { Component } from 'react';

class ProgressBtn extends Component {
	render() {
		var isDisabled = this.props.enabled;
		return (
			<button disabled={isDisabled} type='button' className="btn btn-success" onClick={this.props.handleClick}>
				<strong>Next day</strong>
				<span className="glyphicon glyphicon-triangle-right"></span>
			</button>
		);
	}
}

export default ProgressBtn;