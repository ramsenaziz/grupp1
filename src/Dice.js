import React, { Component } from 'react';
import './css/Dice.css';

class Dice extends Component {

  render() {
    return (
      <button type='button' className='Dice btn btn-primary' onClick={this.props.roll}>Roll Dice!</button>
    )
  }
}

export default Dice;
