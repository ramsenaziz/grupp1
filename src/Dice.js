import React, { Component } from 'react';
import './css/Dice.css';

class Dice extends Component {

  render() {
    return (
      <button className='Dice' onClick={this.props.roll}>Roll Dice!</button>
    )
  }
}

export default Dice;
