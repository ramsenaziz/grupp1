import React from 'react';
import './css/Card.css';
import Card from './Card';

class DCard extends Card {

//  render() {
//    var btnStyle = { display: "block" };
//    if (this.props.location === 1 && this.props.analysis > 0) {
//      btnStyle.display = "none";
//    }
//
//    if (this.props.location === 2 && this.props.development > 0) {
//      btnStyle.display = "none";
//    }
//
//    if (this.props.location === 3 && this.props.testing > 0) {
//      btnStyle.display = "none";
//    }
//    return (
//      <div className='Card col-xs-12'>
//      	<div className='row head'>
//      		<div className='col-xs-12'>{this.props.title}</div>
//      	</div>
//        
//        <p>A: {this.props.analysis}</p>
//        <p>D: {this.props.development}</p>
//        <p>T: {this.props.testing}</p>
//        <button className="btn btn-xs btn-success"
//          style={btnStyle} onClick={() => this.props.Click(this)}>move card</button>
//      </div>
//    )
//  }
}

export default DCard;
