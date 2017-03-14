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

				<div className='row' id='releaseSquare'>
					<h4 style={{
						borderRadius:'5px',
						background: '#79d6ea', 
						color:'black',
						width: '210px',
						heigth: '40px',
						// border: 'red solid 2px',
						paddingLeft: '10px',
						paddingTop: '5px',
						paddingBottom: '5px',
						marginLeft:'95px',
						marginTop:'-10px',
						marginBottom:'10px',
						fontSize:'18px',
						
						// marginBottom:'500px',
						
					}} ><strong>{this.state.days[this.props.day]} Sprint {this.props.sprint}/{this.props.totalSprints}</strong></h4>
				</div>
			</div>
		)
	}
}

export default RelasePlan;