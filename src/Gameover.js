import React, { Component } from 'react';
import './css/Retrospective.css';

class GameOver extends Component {



	render() {
		var display = this.props.visible ? 'block' : 'none';
		var style = { display: display };

		return (
			<div style={style} className='background'>
				<div className='retrospective well well-lg'>
					<h1>Congrats you finished!</h1>
					<h2>Yor total score is:{this.props.score}</h2>


					<button onClick={this.props.done} className='btn btn-success'>New Game</button>
				</div>
			</div>

		)
	}
}

export default GameOver;