import React, { Component } from 'react';
import axios from 'axios';
import './css/Instructions.css';

class Instructions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			instructionsDisplayed: false,
			instructions: ""
		}
	}
	 displayInstructions() {
	 	this.setState({
	 		instructionsDisplayed: !this.state.instructionsDisplayed
	 	})
	}

	componentDidMount() {
	    axios.get('http://localhost/grupp1/src/api/?/instructions').then((response) => {
	        var instructions = response.data.map((obj, i) => {
						return (<div key={obj.id}><h3>{obj.title}</h3>
							<p>{obj.description.split('\n').map((item, key) => {
								return <span key={key}>{item}<br /></span>
							})}</p>
							</div>);
	        });
	        this.setState({ instructions: instructions});
	    });
	}

  render() {
  	var display = this.state.instructionsDisplayed ? 'block' : 'none';
  	var style = { display: display };
	return (
		<div>
	  		<div className="glyphicon glyphicon-question-sign instructions"
	  			onClick={this.displayInstructions.bind(this)}>

	  		</div>

	  		<div className="background" style={style} onClick={this.displayInstructions.bind(this)}>
		  		<div className="text-container well" style={style}>
		  		{this.state.instructions} Click on the screen to exit.
	  			</div>
  			</div>

  		</div>
  	)
  }
}

export default Instructions;
