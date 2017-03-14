import React, { Component } from 'react';

class Employee extends Component {
	handleClick(clickedDude, direction) {
		this.props.move(clickedDude, direction);
	}
	render() {
		var source = './images/';
		switch(this.props.me.role) {
			case '1':
				source += 'ana.png';
				break;
			case '2':
				source += 'dev.png';
				break;
			case '3':
				source += 'test.png';
				break;
			default:
				source += 'ana.png';
		}
		return (
			<div>
				<div>
					<span className="glyphicon glyphicon-arrow-left " aria-hidden="true" onClick={() => {this.handleClick(this, -1)}}></span>
					<img src={require(source)} />
					<span className="glyphicon glyphicon-arrow-right" aria-hidden="true" onClick={() => {this.handleClick(this, 1)}}></span>
				</div>
			</div>
		)
	}
}

export default Employee;
