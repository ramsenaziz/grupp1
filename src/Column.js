import React, { Component } from 'react';
import './css/Column.css';

class Column extends Component {
  render() {

    return (
      <div className='col-xs-2 Column'>
				<div className='row Column-title'>{this.props.title}</div>
				<div className='row Column-body'>{this.props.cards}</div>
      </div>
    )
  }
}
export default Column;
