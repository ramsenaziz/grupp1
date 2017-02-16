import React, { Component } from 'react';
import Employee from './Employee';
import './css/EmployeeCol.css';

class EmployeeCol extends Component {

renderEmployees() {
   return this.props.employees.map(employee =>
     (<Employee me={employee} />))
}

  render() {
		var offset = this.props.offset ? this.props.offset : '';
		var classes = 'EmployeeCol col-xs-2 ' + offset;
    return (
      <div className={classes}>
      	<h4> Score: {this.props.score}</h4>
				{this.renderEmployees()}
      </div>
    )
  }
};

export default EmployeeCol;
