import React, { Component } from 'react';


class Columns extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="Columns col-xs-2">
      <div className="row">
      {this.props.title}
      </div>
      </div>
    )
  }
}

export default Columns;
