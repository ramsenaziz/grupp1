import React, { Component } from 'react';
import TopRowColumns from './TopRowColumns';

class TopRowList extends Component {
   constructor (props) {
       super (props);
       this.state = {
           titles:['Monday', 'Tuesday', 'Wednesday',
           'Thursday', 'Friday']
       }
    //   this.renderColumns = this.renderColumns.bind(this)
   }
renderColumns() {
   return this.state.titles.map(title => (<TopRowColumns key={title} title={title} />))

}
   render ()  {
       return (
       <div className = 'TopRowList'>
           {this.renderColumns()}
       </div>
       )
    }
};
export default TopRowList;
