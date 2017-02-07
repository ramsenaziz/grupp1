import React, { Component } from 'react';
import './css/Column.css';

class Column extends Component {
  render() {
    return (
      <div className='col-xs-2 Column'>
        <div className='row title'>{this.props.title}</div>
          {this.props.cards}
      </div>
    )
  }
}
export default Column;
