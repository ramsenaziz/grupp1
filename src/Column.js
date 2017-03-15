import React, { Component } from 'react';
import './css/Column.css';

class Column extends Component {
	
	columnTotal() {
		var title = this.props.title;
		var cards = this.props.cards;
		var key = this.props.targetVal;
		var total = 0
		if (title != 'Backlog') {
			cards.forEach(card => {
				total += Number(card.props[key])
			})
		}
		
		if (title == 'Done') {
			//this.props.update(total);
		}
		
		return title == 'Done' ? '$'+total : total;
		
	}
	
  render() {
		var style = {backgroundColor: this.props.color, color:'black'};
		var className = 'col-xs-2 Column ' + this.props.offset;
	return (
      <div className={className}>
				<div className='row Column-title' style={style}>{this.props.title} {this.columnTotal()}</div>
				<div className='row Column-body'>{this.props.cards}</div>
      </div>
    )
  }
}
export default Column;
