import React, { Component } from 'react';

class ProgressBtn extends Component {
	render() {
		return (
			<button className="btn btn-success" onClick={this.props.handleClick}>
				<strong>Nästa dag</strong>
				<span className="glyphicon glyphicon-triangle-right"></span>
			</button>
		);
	}
}

export default ProgressBtn;