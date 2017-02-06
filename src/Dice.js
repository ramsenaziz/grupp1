import React, { Component } from 'react';
import './css/Dice.css';

class Dice extends Component {

  roll() {
    return alert(Math.floor(Math.random() * ((6 - 1) + 1) + 1));
  }

  render() {
    return (
      <button className='Dice' onClick={this.roll}>Roll Dice!</button>
    )
  }
}

export default Dice;
