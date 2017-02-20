import React, { Component } from 'react';
import './css/Card.css';

class Card extends Component {
  render() {
    var btnStyle = { display: "block" };

    if (this.props.location === 1 && this.props.analysis > 0) {
      btnStyle.display = "none";
    }

    if (this.props.location === 2 && this.props.development > 0) {
      btnStyle.display = "none";
    }

    if (this.props.location === 3 && this.props.testing > 0) {
      btnStyle.display = "none";
    }

    return (
      <div className='Card col-xs-12'>
      	<div className='row head'>
      		<div className='col-xs-8'>{this.props.title}</div>
        	<div className='col-xs-2'>
        		{this.props.money ? '$' + this.props.money: ''}
					</div>
      	</div>
        
        <p>A: {this.props.analysis}</p>
        <p>D: {this.props.development}</p>
        <p>T: {this.props.testing}</p>
        <button className="btn btn-xs btn-success"
          style={btnStyle} onClick={() => this.props.Click(this)}>move card</button>
      </div>
    )
  }
}

export default Card;
