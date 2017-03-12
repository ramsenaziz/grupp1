import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import ProgressBtn from './ProgressBtn';
class RelasePlan extends Component {
	constructor() {
		super();
		this.state = {
			days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
		}
	}

	render() {
		return (
			<div>
				<div className="row">
					<ProgressBar bar={this.props.day * 25} />
				</div>

				<div className='row'>
					<h4><strong>{this.state.days[this.props.day]}. Sprint {this.props.sprint}/{this.props.totalSprints}</strong></h4>
				</div>
			</div>
		)
	}
}

export default RelasePlan;