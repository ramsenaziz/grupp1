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
				<div className="row" style={{paddingTop: '10px'}}>
					<ProgressBar
						bar={(this.props.day + 1) * 20}
						day={this.state.days[this.props.day]}
					/>
				</div>
			</div>
		)
	}
}

export default RelasePlan;