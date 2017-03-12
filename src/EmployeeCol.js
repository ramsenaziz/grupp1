import React, { Component } from 'react';
import Employee from './Employee';
import './css/EmployeeCol.css';

class EmployeeCol extends Component {

renderEmployees() {
   return this.props.employees.map(employee =>
     (<Employee key={employee.id} me={employee} />))
}


  render() {
		var offset = this.props.offset ? this.props.offset : '';
		var classes = 'EmployeeCol col-xs-2 ' + offset;
    return (
      <div className={classes}>
      	<h4><strong> Score: {this.props.score}</strong></h4>
				{this.renderEmployees()}
      </div>
    )
  }
};

export default EmployeeCol;
