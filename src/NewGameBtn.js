import React, { Component } from 'react';
// import './css/NewGameBtn.css';

class NewGameBtn extends Component {
  render() {
    return (
      <button className='btn btn-secondary' onClick={this.props.handleClick}>New Game</button>
    )
  }
}

export default NewGameBtn;
