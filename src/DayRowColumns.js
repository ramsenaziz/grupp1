
import React, { Component } from 'react';
import './css/Column.css';

class DayRowColumns extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="Columns col-xs-2">
      <div className="row">
      |  {this.props.day}  |
      </div>
      </div>
    )
  }
}

export default DayRowColumns;
