
import React, { Component } from 'react';
import './css/Column.css';

class PlayerColumns extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="Columns col-xs-2">
      <div className="row">
       {this.props.player}
      </div>
      </div>
    )
  }
}

export default PlayerColumns;
