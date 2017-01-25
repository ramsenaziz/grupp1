// KOLUMNER DÄR KORTEN LIGGER
import React, { Component } from 'react';
import Columns2 from './Columns2';

class Columnlist2 extends Component {
   constructor (props) {
       super (props);
       this.state = {
           titles:['Userstory card #1', 'Analysis card #1',
           'Development card #1', 'Testing card #1', 'Done cards']
       }
    //   this.renderColumns = this.renderColumns.bind(this)
   }
renderColumns() {
   return this.state.titles.map(title => (<Columns2 key={title} title={title} />))

}
   render ()  {
       return (
       <div className = 'ColumnList2'>
           {this.renderColumns()}
       </div>
       )
    }
};


export default Columnlist2;
