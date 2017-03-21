import React, {Component} from 'react';
import './css/Column.css';
import './css/Backlog.css';

class Backlog extends Component {
	
	render() {
		var userStories = this.props.cards.filter(card => card.props.type == 0);
		var defects = this.props.cards.filter(card => card.props.type == 1);
		var maintenance = this.props.cards.filter (card => card.props.type == 2);
		
		return (
			<div className='col-xs-2 Column col-xs-offset-1'>
				<div className='row Column-title'>Backlog</div>
				<div className='row Column-body owerflow'>
					<div className='row card-stack card-stack-us'>{userStories.reverse()}</div>
					<div className='row card-stack card-stack-d'>{defects.reverse()}</div>
					<div className='row card-stack card-stack-m'>{maintenance.reverse()}</div>
				</div>
			</div>
		)
	}
}

export default Backlog;