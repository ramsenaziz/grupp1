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
		//borderRadius:'5px',
						//background: '#79d6ea', 
						//color:'black',
						//width: '210px',
						//heigth: '40px',
						//// border: 'red solid 2px',
						//paddingLeft: '10px',
						//paddingTop: '5px',
						//paddingBottom: '5px',
						//marginLeft:'95px',
						//marginTop:'-10px',
						//marginBottom:'10px',
						//fontSize:'18px',
						
						// marginBottom:'500px'
		return (
			<div>
				<div className="row" style={{paddingTop: '10px'}}>
					<ProgressBar
						bar={(this.props.day + 1) * 20}
						day={this.state.days[this.props.day]}
						sprint={this.props.sprint}
						totalSprints={this.props.totalSprints}
					/>
				</div>
			</div>
		)
	}
}

export default RelasePlan;