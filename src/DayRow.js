import React, { Component } from 'react';
import DayRowColumns from './DayRowColumns';

class DayRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days:['Monday', 'Tuesday', 'Wednesday',
           'Thursday', 'Friday', 'Weekend']
      }
}

renderDays() {
   return this.state.days.map(day =>
     (<DayRowColumns key={day} day={day} />))
}

  render() {
    return (
      <div className='DayRow' >
          {this.renderDays()}
      </div>
    )
  }
};

export default DayRow;
