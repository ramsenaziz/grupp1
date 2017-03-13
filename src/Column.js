import React, { Component } from 'react';
import './css/Column.css';

class Column extends Component {
  render() {
		var style = {backgroundColor: this.props.color};
		var className = 'col-xs-2 Column ' + this.props.offset;
	return (
      <div className={className}>
				<div className='row Column-title' style={style}>{this.props.title}</div>
				<div className='row Column-body'>{this.props.cards}</div>
      </div>
    )
  }
}
export default Column;
