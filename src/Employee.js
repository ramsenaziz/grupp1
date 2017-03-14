import React, { Component } from 'react';

class Employee extends Component {
	render() {
		return (
			<div>
				<div>
					<span className="glyphicon glyphicon-arrow-left " aria-hidden="true"></span>

					<img src ={require(this.props.me.img)} />
					<span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
				</div>
			</div>
		)
	}
}

export default Employee;
