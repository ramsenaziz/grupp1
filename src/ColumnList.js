import './ColumnList.css';
import Column from './Column.js';
import React,{Component}from"react";

class ColumnList extends Component{
	constructor(props) {
    super (props);
		this.state = {
			titles: ['Backlog', 'Analysis', 'Development', 'Testing', 'Done', 'Unexpected']
		}
		this.renderColumn=this.renderColumn.bind(this)
  }

renderColumn (){
	return this.state.titles.map(title => (<Column key={title} title={title}/>))
}
	render() {
		return (
			<div className='ColumnList'>
					{this.renderColumn}
			</div>
		)
	}
};
export default ColumnList;