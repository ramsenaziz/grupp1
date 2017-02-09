import React, { Component } from 'react';
import Column from './Column';
import DayRowColumns from './DayRowColumns';

class DayRow extends Component {

  render() {
    return (
      <div className='DayRow' >
        <DayRowColumns day='Monday' />
        <DayRowColumns day='Tuesday' />
        <DayRowColumns day='Wednesday' />
        <DayRowColumns day='Thursday' />
        <DayRowColumns day='Friday' />
      </div>
    )
  }
};

export default DayRow;
