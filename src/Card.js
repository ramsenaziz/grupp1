import React, { Component } from 'react';
import './css/Card.css';

class Card extends Component {

  handleClick() {
    var obj = {
      title: this.props.title,
      analysis: this.props.analysis,
      development: this.props.development,
      testing: this.props.testing
    }
    this.props.Click(obj);
  }

  render() {
    return (
      <div className='Card row' onClick={this.handleClick.bind(this)}>
        <div className='head'>
          {this.props.title}
          <span>${this.props.money}</span>
        </div>
        <p>A: {this.props.analysis}</p>
        <p>D: {this.props.development}</p>
        <p>T: {this.props.testing}</p>
      </div>
    )
  }
}

export default Card;
