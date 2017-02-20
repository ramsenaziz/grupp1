import React, { Component } from 'react';
import './css/Dice.css';

class Dice extends Component {
	
	handleClick() {
		if (!this.props.disabled) {
			this.props.roll();
		}
	}

  render() {
		var isDisabled = this.props.disabled;
    return (
      <button disabled={isDisabled} type='button' className='Dice btn btn-primary' onClick={this.handleClick.bind(this)}>Roll Dice!</button>
    )
  }
}

export default Dice;
