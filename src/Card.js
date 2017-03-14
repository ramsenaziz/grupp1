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
            {this.props.money ? '$' + this.props.money : ''}
          </div>
        </div>

        <p style={{
          width: 67,
          marginTop: 5,
          marginLeft:0,
          // border: '1px solid black',
          borderRadius: 5,
          paddingLeft: 20,
          backgroundColor: 'lightblue',
          color: 'black',
        }}> A: {this.props.analysis} </p>

        <p style={{
          width:67,
          marginTop: 5,
          marginLeft: 0,
          // border: '5px dotted black',
          borderRadius: 5,
          paddingLeft: 20,
          backgroundColor: 'lightgray',
          color: 'black',
        }}>D: {this.props.development}</p>

        <p style={{
          width: 67,
          marginTop: 5,
          marginLeft: 0,
          marginBottom:20,
          // border: '1px dotted black',
          borderRadius: 5,
          paddingLeft: 20,
          background: 'lightpink',
          color: 'black',
        }}>T: {this.props.testing}</p>

        <button className="btn btn-xs btn-success move"
          style={btnStyle} onClick={() => this.props.Click(this)}>move  <span className="glyphicon glyphicon-arrow-right"></span></button>
         
      </div>
    )
  }
}

export default Card;
