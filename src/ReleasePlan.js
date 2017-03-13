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
						borderRadius:'10px',
						background: 'black', 
						color:'white',
						width: '250px',
						heigth: '80px',
						border: 'red solid 4px',
						paddingLeft: '10px',
						paddingTop: '5px',
						paddingBottom: '5px',
						marginLeft:'-370px',
						marginTop:'-60px',
						fontSize:'40px',
						// marginBottom:'500px',
						
					}} ><strong>{this.state.days[this.props.day]} Sprint {this.props.sprint}/{this.props.totalSprints}</strong></h4>
				</div>
			</div>
		)
	}
}

export default RelasePlan;