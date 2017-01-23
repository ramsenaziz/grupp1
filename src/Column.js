
import React,{Component}from"react";

class Column extends Component{
  constructor(props) {
    super (props);
  }
  render() {
    return (
      <div className='Column'>
          <h1>{this.props.title}</h1>
      </div>
    )
  }
};
export default Column;