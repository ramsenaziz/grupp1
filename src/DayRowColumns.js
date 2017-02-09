
import React, { Component } from 'react';
import './css/Column.css';

class DayRowColumns extends Component {

  render(){
    return (
      <div className="Columns col-xs-2">
        |  {this.props.day}  |
      </div>
    )
  }
}

export default DayRowColumns;
