// DET HÄR HÄMTAS IN TILL COLUMNLIST2
import React, { Component } from 'react';

class Columns2 extends Component {
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
// Kort: Lägga in en render för att få dit ett kort

}

export default Columns2;
