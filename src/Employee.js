import React, { Component } from 'react';

class Employee extends Component {
	handleClick() {
		console.log('clicked');
	}
	render() {
		return (
			<div>
				<div>
					<span className="glyphicon glyphicon-arrow-left " aria-hidden="true" onClick={this.handleClick}></span>
					<img src={require(this.props.me.img)} alt={this.props.me.role}/>
					<span className="glyphicon glyphicon-arrow-right" aria-hidden="true" onClick={this.handleClick}></span>
				</div>
			</div>
		)
	}
}

export default Employee;
