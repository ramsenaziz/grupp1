import React, { Component } from 'react';
import './css/Card.css';
import Card from './Card';

class DCard extends Card {

  render() {
    return (
      <div className='Card row' onClick={this.handleClick.bind(this)}>
        <div className='head'>
          {this.props.title}
        </div>
        <p>A: {this.props.analysis}</p>
        <p>D: {this.props.development}</p>
        <p>T: {this.props.testing}</p>
      </div>
    )
  }
}

export default DCard;
