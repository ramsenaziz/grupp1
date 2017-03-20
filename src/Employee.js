import React, { Component } from 'react';
import './css/Employee.css';

class Employee extends Component {
	handleClick(clickedDude) {
		if (this.props.allowedToMove) {
			this.props.move(clickedDude);
		}
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
			<div className='Employee'>
				<img
					src={require(source)}
					style={{opacity: this.props.allowedToMove ? '1' : '0.6'}}
					onClick={() => {this.handleClick(this)}}
				/>
			</div>
		)
	}
}

export default Employee;