import './css/Column.css';
import Column from './Column';
import React from 'react';

class DoneColumn extends Column {
	
	componentWillReceiveProps(nextProps) {
		var cards = nextProps.cards;
		var key = this.props.targetVal;
		var total = 0;
		cards.forEach(card => {
			total += Number(card.props[key]);
		})
		if (total > this.props.points) {
			this.props.update(total);
		}
	}
	//
	//totalPoints() {
	//	var title = this.props.title;
	//	var cards = this.props.cards;
	//	var key = this.props.targetVal;
	//	var total = 0;
	//	if (title != 'Backlog') {
	//		cards.forEach(card => {
	//			total += Number(card.props[key]);
	//		})
	//	}
	//}
	
	render() {
		var style = {backgroundColor: this.props.color, color:'black'};
	return (
      <div className='col-xs-2 Column'>
				<div className='row Column-title' style={style}>{this.props.title} ${this.props.points}</div>
				<div className='row Column-body'>{this.props.cards}</div>
      </div>
    )
  }
}

export default DoneColumn;