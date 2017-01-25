import React, { Component } from 'react';
import Columns from './Columns';

class Columnlist extends Component {
   constructor (props) {
       super (props);
       this.state = {
           titles:['Backlog', 'Analysis', 'Development', 'Testing', 'Done']
       }
    //   this.renderColumns = this.renderColumns.bind(this)
   }
renderColumns() {
   return this.state.titles.map(title => (<Columns key={title} title={title} />))

}
   render ()  {
       return (
       <div className = 'ColumnList'>
           {this.renderColumns()}
       </div>
       )
    }
};
export default Columnlist;
