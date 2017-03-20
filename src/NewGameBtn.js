import React, { Component } from 'react';
// import './css/NewGameBtn.css';

class NewGameBtn extends Component {
  render() {
    return (
      <button type='button' className='btn btn-lg newgame' onClick={this.props.handleClick}><strong>New Game</strong></button>
    )
  }
}

export default NewGameBtn;
