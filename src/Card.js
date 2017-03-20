import React, { Component } from 'react';
import './css/Card.css';

class Card extends Component {
  render() {
    var btnStyle = { display: "block" };

    if (this.props.location === 1 && this.props.analysis > 0 || this.props.location === 4) {
      btnStyle.display = "none";
    }

    if (this.props.location === 2 && this.props.development > 0) {
      btnStyle.display = "none";
    }

    if (this.props.location === 3 && this.props.testing > 0) {
      btnStyle.display = "none";
    }
		
		var ABarWidth = this.props.analysis * 10;
		var DBarWidth = this.props.development * 10;
		var TBarWidth = this.props.testing * 10;
		
		var headColors = ['#8d79ea', '#79ea8d','#ea8d79'];
		var color = '#eee';
		if (this.props.type == 1) {
			color = '#333';
		}

    return (
      <div className='Card col-xs-10 col-xs-offset-1'>
        <div className='row Card-head' style={{color: color, backgroundColor: headColors[this.props.type]}}>
          <div className='col-xs-7'>{this.props.title}</div>
          <div className='col-xs-2'>
            {this.props.money ? '$' + this.props.money : ''}
          </div>
        </div>
				
        <div className="progress Card-progress">
					<div className="progress-bar" role="progressbar" aria-valuemin="0" 
					aria-valuemax="100" style={{width: ABarWidth + '%', backgroundColor: '#79d6ea'}}>
						<span>{this.props.analysis}</span>
					</div>
				</div>

				<div className="progress Card-progress">
					<div className="progress-bar" role="progressbar" aria-valuemin="0" 
					aria-valuemax="100" style={{width: DBarWidth + '%', backgroundColor: 'lightgrey'}}>
						<span>{this.props.development}</span>
					</div>
				</div>

        <div className="progress Card-progress">
					<div className="progress-bar" role="progressbar" aria-valuemin="0" 
					aria-valuemax="100" style={{width: TBarWidth + '%', backgroundColor: 'lightpink'}}>
						<span>{this.props.testing}</span>
					</div>
				</div>

        <button className="btn btn-xs btn-success move"
          style={btnStyle} onClick={() => this.props.Click(this)}>move  <span className="glyphicon glyphicon-arrow-right"></span></button>
         
      </div>
    )
  }
}

export default Card;
