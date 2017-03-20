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
      <button disabled={isDisabled} type='button' className='Dice btn btn-secondary' onClick={this.handleClick.bind(this)}><strong>Roll Dice!</strong></button>
    )
  }
}

export default Dice;
