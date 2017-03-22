import React, {Component} from 'react';
import './css/Slider.css';

class Slider extends Component {

	constructor() {
		super();
		this.state = {
			currentVal: 0
		}
	}

	componentWillMount() {
		this.setState({currentVal: this.props.currentVal});
	}

	slide(e) {
		this.setState({currentVal: e.target.value})
	}

	update(e) {
		this.props.handleChange(this.props.trg, e.target.value);
	}

	render() {
		return(
			<label>{this.props.label} {this.state.currentVal}
				<input
					type='range'
					style={{backgroundColor: this.props.color}}
					min={this.props.min}
					max={this.props.max}
					step='1'
					value={this.state.currentVal}
					onInput={this.slide.bind(this)}
					onMouseUp={this.update.bind(this)}
				/>
			</label>
		)
	}
}

export default Slider;