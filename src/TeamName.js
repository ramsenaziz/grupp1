import React, { Component } from 'react';
import Slider from './Slider';
import './css/Retrospective.css';
import './css/TeamName.css';

class TeamName extends Component {

	constructor() {
		super();
		this.state = {
			expanded: false,
		}
	}

	render() {
		var display = this.props.visible ? 'block' : 'none';
		var style = { display: display };
		var drawerClass = 'row teamname-drawer';
		drawerClass += this.state.expanded ? ' active' : '';
		let input;
		return (
			<div style={style} className='background'>
				<div
					style={{
						background: '#bbb',
						paddingTop: '0px',
						border: '5px white solid',
					}}
					className='retrospective teamname well well-lg'>
					<div className='row'>
						<div className='col-xs-8 col-xs-offset-2'>
							<div className='row'>
								<h2>Enter a teamname</h2>
							</div>
							<div className='row'>
								<input
									type='text'
									ref={node => { input = node; }}
								/>
								<button className='btn btn-primary'
									onClick={() => {this.props.startgame(input.value);}}>
									New Game
								</button>
								<button className='btn btn-default' onClick={() => { this.setState({ expanded: !this.state.expanded }) }}>
									<span className='glyphicon glyphicon-cog' aria-hidden='true'></span>
								</button>
							</div>
						</div>
					</div>
					<div className={drawerClass}>
						<div className='col-xs-4'>
							<Slider label='User Stories' trg='usAmount' min='25' max='100' currentVal={this.props.usAmount} handleChange={this.props.handleChange}/>
						</div>
						<div className='col-xs-4'>
							<Slider label='Defects' trg='dAmount' min='0' max='10' currentVal={this.props.dAmount} handleChange={this.props.handleChange} />
						</div>
						<div className='col-xs-4'>
							<Slider label='Maintenance' trg='mAmount' min='0' max='15' currentVal={this.props.mAmount} handleChange={this.props.handleChange} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default TeamName;