import React, {Component} from 'react';

class Employee extends Component {
	render() {
		return (
			<div>
				<div>
					<span className="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>
					{this.props.me.role.toUpperCase()}
					<span className="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
						{this.props.me.role.toUpperCase()}
					<span className="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>	
				</div>
			</div>
		)
	}
}

export default Employee;
