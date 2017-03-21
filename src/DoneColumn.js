import './css/Column.css';
import Column from './Column';
import React from 'react';

class DoneColumn extends Column {
	
	componentWillReceiveProps(nextProps) {
		var cards = nextProps.cards;
		var total = 0;
		cards.forEach(card => {
			if (card.props.money) {
				total += Number(card.props.money);
			}	
		})
		if (total > this.props.points) {
			this.props.update(total);
		}
	}
	
	render() {
		var style = {backgroundColor: this.props.color};
	return (
      <div className='col-xs-2 Column'>
				<div className='row Column-title' style={style}>{this.props.title} ${this.props.points}</div>
				<div className='row Column-body'>{this.props.cards}</div>
      </div>
    )
  }
}

export default DoneColumn;